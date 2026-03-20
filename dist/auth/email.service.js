"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = __importStar(require("nodemailer"));
let EmailService = EmailService_1 = class EmailService {
    constructor() {
        this.logger = new common_1.Logger(EmailService_1.name);
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
            port: parseInt(process.env.SMTP_PORT || '2525'),
            auth: {
                user: process.env.SMTP_USER || 'test',
                pass: process.env.SMTP_PASS || 'test',
            },
        });
    }
    async sendVerificationEmail(email, firstName, token) {
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
        }
        catch (error) {
            this.logger.error(`Failed to send verification email to ${email}:`, error);
            throw error;
        }
    }
    async sendPasswordResetEmail(email, firstName, token) {
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
        }
        catch (error) {
            this.logger.error(`Failed to send password reset email to ${email}:`, error);
            throw error;
        }
    }
    async sendWelcomeEmail(email, firstName) {
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
        }
        catch (error) {
            this.logger.error(`Failed to send welcome email to ${email}:`, error);
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
//# sourceMappingURL=email.service.js.map