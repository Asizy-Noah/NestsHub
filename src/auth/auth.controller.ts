import { Controller, Post, Get, Body, Query, Render, UseGuards, Request, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
 
  // Frontend Routes
  @Get('register')
  @Render('auth/register')
  getRegister() {
    return {
      title: 'Register - Real Estate',
      roles: ['individual', 'hostel_owner', 'hotel_owner', 'property_manager'],
      layout: 'layouts/auth',
    };
  }

  @Get('login')
  @Render('auth/login')
  getLogin() {
    return { 
      title: 'Login - Real Estate',
    layout: 'layouts/auth',
   };
  }

  @Get('verify-email')
  @Render('auth/verify-email')
  getVerifyEmail(@Query('token') token: string) {
    return { title: 'Verify Email', token };
  }

  @Get('set-password')
  @Render('auth/set-password')
  getSetPassword(@Query('accountId') accountId: string) {
    return { title: 'Set Password', accountId };
  }

  @Get('reset-password')
  @Render('auth/reset-password')
  getResetPassword(@Query('token') token: string) {
    return { title: 'Reset Password', token };
  }

  @Get('forgot-password')
  @Render('auth/forgot-password')
  getForgotPassword() {
    return { title: 'Forgot Password' };
  }

  // API Routes
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Post('verify-email')
  async verifyEmail(@Body('token') token: string) {
    return await this.authService.verifyEmail(token);
  }

  @Post('set-password')
  async setPassword(
    @Body('accountId') accountId: string,
    @Body() setPasswordDto: SetPasswordDto,
  ) {
    return await this.authService.setPassword(accountId, setPasswordDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    
    // Add redirect information based on role
    if (result.user) {
      const roleRedirectMap = {
        'admin': '/dashboard/admin',
        'staff': '/dashboard/staff',
        'hostel_owner': '/dashboard/hostel',
        'hotel_owner': '/dashboard/hotel',
        'property_manager': '/dashboard/properties',
        'individual': '/dashboard',
      };
      (result as any).redirect = roleRedirectMap[result.user.role] || '/dashboard';
    }
    
    return result;
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return await this.authService.initiatePasswordReset(email);
  }

  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return await this.authService.resetPassword(token, resetPasswordDto);
  }

  @Get('validate-token')
  @UseGuards(JwtAuthGuard)
  async validateToken(@Request() req: any) {
    return { valid: true, user: req.user };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Request() req: any) {
    const user = await this.authService.getAccountById(req.user.userId);
    return user;
  }
}
