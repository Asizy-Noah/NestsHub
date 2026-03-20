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
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_PORT === '465',
            auth: {
                user: process.env.SMTP_USER || 'asionoah@gmail.com',
                pass: process.env.SMTP_PASS || 'zifx acyy ngku ivdx',
            },
        });
    }
    getBaseTemplate(content) {
        return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F8FAFC; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #FFFFFF; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08); border: 1px solid #E2E8F0;">
                <tr>
                  <td style="background-color: #1E293B; padding: 40px; text-align: center;">
                    <div style="display: inline-block; background-color: #10B981; padding: 10px; border-radius: 12px; margin-bottom: 15px;">
                        <img src="https://img.icons8.com/ios-filled/50/ffffff/apartment-complex.png" width="30" height="30" alt="Logo" style="display: block;">
                    </div>
                    <h1 style="color: #FFFFFF; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -1px;">Nest<span style="color: #10B981;">Hub</span></h1>
                    <p style="color: #94A3B8; margin: 5px 0 0 0; font-size: 14px; font-weight: 500;">Real Estate Management Platform</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 50px 40px; color: #0F172A;">
                    ${content}
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #F1F5F9; padding: 30px; text-align: center; color: #64748B; font-size: 13px;">
                    <p style="margin: 0; font-weight: 600; color: #1E293B;">&copy; 2026 NestsHub Uganda</p>
                    <p style="margin: 5px 0;">Providing professional property and hospitality management solutions.</p>
                    <div style="margin-top: 15px;">
                        <a href="#" style="color: #10B981; text-decoration: none; margin: 0 10px;">Support</a>
                        <a href="#" style="color: #10B981; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
    }
    async sendVerificationEmail(email, firstName, token) {
        const verificationUrl = `${process.env.APP_URL || 'http://localhost:3000'}/auth/verify-email?token=${token}`;
        const content = `
      <h2 style="margin-top: 0; font-size: 24px; font-weight: 700;">Welcome to the family, ${firstName}!</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #475569;">We're excited to have you join our real estate community. To get started with managing your properties or hostels, please verify your email address below.</p>
      
      <div style="text-align: center; margin: 40px 0;">
        <a href="${verificationUrl}" style="background-color: #F59E0B; color: #FFFFFF; padding: 16px 35px; text-decoration: none; border-radius: 12px; font-weight: 700; display: inline-block; box-shadow: 0 4px 6px -1px rgba(245, 158, 11, 0.2);">Verify Account</a>
      </div>
      
      <p style="font-size: 14px; color: #94A3B8; background: #F8FAFC; padding: 15px; border-radius: 8px; border: 1px dashed #E2E8F0;">
        <b>Link Troubles?</b> Copy and paste this into your browser:<br>
        <span style="color: #10B981;">${verificationUrl}</span>
      </p>
      <p style="font-size: 14px; color: #64748B; margin-top: 20px;">This verification link will expire in <b>24 hours</b>.</p>
    `;
        const mailOptions = {
            from: process.env.FROM_EMAIL || '"NestsHubUg" <asionoah@gmail.com>',
            to: email,
            subject: 'Verify Your Email - NestHub',
            html: this.getBaseTemplate(content),
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
        const content = `
      <h2 style="margin-top: 0; font-size: 24px; font-weight: 700; color: #1E293B;">Password Reset Request</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #475569;">Hi ${firstName}, we received a request to reset your NestHub password. Click the button below to secure your account and set a new password.</p>
      
      <div style="text-align: center; margin: 40px 0;">
        <a href="${resetUrl}" style="background-color: #F59E0B; color: #FFFFFF; padding: 16px 35px; text-decoration: none; border-radius: 12px; font-weight: 700; display: inline-block; box-shadow: 0 4px 6px -1px rgba(245, 158, 11, 0.2);">Reset Password</a>
      </div>
      
      <p style="font-size: 14px; line-height: 1.6; color: #64748B;">If you did not request this reset, you can safely ignore this email. Your password will remain unchanged.</p>
      <p style="font-size: 14px; color: #64748B; margin-top: 20px;">This request is valid for <b>1 hour</b> only.</p>
    `;
        const mailOptions = {
            from: process.env.FROM_EMAIL || '"NestsHubUg" <asionoah@gmail.com>',
            to: email,
            subject: 'Secure Password Reset - NestHub',
            html: this.getBaseTemplate(content),
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
        const content = `
      <h2 style="margin-top: 0; font-size: 24px; font-weight: 700; color: #10B981;">Account Verified!</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #475569;">Welcome aboard, ${firstName}! Your account has been successfully verified. You now have full access to the NestHub property management suite.</p>
      
      <div style="background-color: #F8FAFC; border-radius: 12px; padding: 25px; margin: 30px 0; border-left: 4px solid #10B981;">
        <h4 style="margin: 0 0 10px 0; color: #1E293B;">Next Steps:</h4>
        <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 15px;">
            <li>Set up your property profile</li>
            <li>List your first rental or hostel room</li>
            <li>Enable two-factor authentication for added security</li>
        </ul>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.APP_URL}/dashboard" style="background-color: #1E293B; color: #FFFFFF; padding: 14px 30px; text-decoration: none; border-radius: 12px; font-weight: 600; display: inline-block;">Go to Dashboard</a>
      </div>
    `;
        const mailOptions = {
            from: process.env.FROM_EMAIL || '"NestsHubUg" <asionoah@gmail.com>',
            to: email,
            subject: 'Welcome to NestHub Uganda!',
            html: this.getBaseTemplate(content),
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