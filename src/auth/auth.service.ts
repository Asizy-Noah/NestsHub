import { Injectable, BadRequestException, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { Account, AccountRole, AccountStatus } from '../accounts/schemas/account.schema';
import { EmailService } from './email.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Destructure all incoming fields
    const { email, firstName, lastName, role, otherNames, phone, nationality, idNumber, hostelName, hotelName } = registerDto;

    const existingAccount = await this.accountModel.findOne({ email: email.toLowerCase() });
    if (existingAccount) {
      throw new ConflictException('Email already registered');
    }

    const emailVerificationToken = uuid();
    const emailVerificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Map all the data to the new account
    const account = new this.accountModel({
      email: email.toLowerCase(),
      firstName,
      lastName,
      otherNames,
      role,
      phoneNumber: phone,
      nationality,
      idNumber,
      hostelName,
      hotelName,
      status: AccountStatus.PENDING_EMAIL_VERIFICATION,
      emailVerificationToken,
      emailVerificationExpiry,
    });

    await account.save();
    await this.emailService.sendVerificationEmail(email, firstName, emailVerificationToken);

    return { message: 'Registration successful. Please verify your email.', accountId: account._id };
  }

  async verifyEmail(token: string) {
  const account = await this.accountModel.findOne({
    emailVerificationToken: token,
    emailVerificationExpiry: { $gt: new Date() },
  });

  if (!account) {
    throw new BadRequestException('Invalid or expired verification token');
  }

  // 1. Update the status enum
  account.status = AccountStatus.EMAIL_VERIFIED;

  // 2. CRITICAL: Update the boolean property to true
  account.emailVerified = true;

  // 3. Clear the token and expiry for security
  account.emailVerificationToken = null;

  await account.save(); //

  return { 
    message: 'Email verified successfully', 
    accountId: account._id 
  };
}

  async setPassword(accountId: string, setPasswordDto: SetPasswordDto) {
    const { password } = setPasswordDto;
    
    // 1. Find user
    const account = await this.accountModel.findById(accountId);
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    // 2. Hash password (assuming you use bcrypt)
    const salt = await bcrypt.genSalt();
    account.password = await bcrypt.hash(password, salt);
    
    // 3. Update status and clear token
    account.status = AccountStatus.ACTIVE;
    account.emailVerificationToken = null; 
    
    await account.save();
    return { message: 'Password set successfully' };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const account = await this.accountModel.findOne({ email: email.toLowerCase() });
    if (!account) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!account.emailVerified) {
      throw new UnauthorizedException('Please verify your email first');
    }

    if (!account.password) {
      throw new UnauthorizedException('Password not set. Please set password first');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (account.status !== AccountStatus.ACTIVE) {
      throw new UnauthorizedException('Account is not active');
    }

    // Generate JWT token
    const token = this.jwtService.sign(
      {
        sub: account._id,
        email: account.email,
        role: account.role,
      },
      { expiresIn: '24h' },
    );

    return {
      accessToken: token,
      user: {
        id: account._id,
        email: account.email,
        firstName: account.firstName,
        lastName: account.lastName,
        role: account.role,
      },
    };
  }

  async initiatePasswordReset(email: string) {
    const account = await this.accountModel.findOne({ email: email.toLowerCase() });
    if (!account) {
      // Don't reveal if email exists or not for security
      return {
        message: 'If the email exists, a password reset link has been sent.',
      };
    }

    const resetToken = uuid();
    const resetExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    account.passwordResetToken = resetToken;
    account.passwordResetExpiry = resetExpiry;
    await account.save();

    await this.emailService.sendPasswordResetEmail(email, account.firstName, resetToken);

    return {
      message: 'If the email exists, a password reset link has been sent.',
    };
  }

  async resetPassword(token: string, resetPasswordDto: ResetPasswordDto) {
    const { password, confirmPassword } = resetPasswordDto;

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const account = await this.accountModel.findOne({
      passwordResetToken: token,
      passwordResetExpiry: { $gt: new Date() },
    });

    if (!account) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // CORRECTED: Save the HASH, not the plain text
    account.password = passwordHash; 
    
    account.passwordResetToken = null as any;
    account.passwordResetExpiry = null as any;
    await account.save();

    return {
      message: 'Password reset successfully. You can now login.',
    };
}

  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async getAccountById(id: string) {
    return await this.accountModel.findById(id).select('-passwordHash');
  }
}
