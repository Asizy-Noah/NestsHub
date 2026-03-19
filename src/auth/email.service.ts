import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(EmailService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
      port: parseInt(process.env.SMTP_PORT || '2525'),
      auth: {
        user: process.env.SMTP_USER || 'test',
        pass: process.env.SMTP_PASS || 'test',
      },
    });
  }

  async sendVerificationEmail(email: string, firstName: string, token: string) {
    const verificationUrl = `${process.env.APP_URL || 'http://localhost:3000'}/auth/verify-email?token=${token}`;

    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@realestate.com',
      to: email,
      subject: 'Verify Your Email - Real Estate',
      html: `
        <h2>Welcome ${firstName}!</h2>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
          Verify Email
        </a>
        <p>Or copy and paste this link in your browser:</p>
        <p>${verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Verification email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send verification email to ${email}:`, error);
      throw error;
    }
  }

  async sendPasswordResetEmail(email: string, firstName: string, token: string) {
    const resetUrl = `${process.env.APP_URL || 'http://localhost:3000'}/auth/reset-password?token=${token}`;

    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@realestate.com',
      to: email,
      subject: 'Password Reset - Real Estate',
      html: `
        <h2>Password Reset Request</h2>
        <p>Hi ${firstName},</p>
        <p>You requested to reset your password. Click the link below to proceed:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
          Reset Password
        </a>
        <p>Or copy and paste this link in your browser:</p>
        <p>${resetUrl}</p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Password reset email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send password reset email to ${email}:`, error);
      throw error;
    }
  }

  async sendWelcomeEmail(email: string, firstName: string) {
    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@realestate.com',
      to: email,
      subject: 'Welcome to Real Estate!',
      html: `
        <h2>Welcome ${firstName}!</h2>
        <p>Your account has been successfully created and verified.</p>
        <p>You can now access all features of our Real Estate platform.</p>
        <p>If you have any questions, please contact our support team.</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Welcome email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send welcome email to ${email}:`, error);
    }
  }
}
