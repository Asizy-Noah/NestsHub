"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const register_dto_1 = require("./dto/register.dto");
const login_dto_1 = require("./dto/login.dto");
const set_password_dto_1 = require("./dto/set-password.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const account_schema_1 = require("../accounts/schemas/account.schema");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    getRegister() {
        return {
            title: 'Register - Real Estate',
            roles: ['individual', 'hostel_owner', 'hotel_owner', 'property_manager'],
            layout: 'layouts/auth',
        };
    }
    getLogin() {
        return {
            title: 'Login - Real Estate',
            layout: 'layouts/auth',
        };
    }
    getVerifyEmail(token) {
        return {
            title: 'Verify Email',
            token,
            layout: 'layouts/auth',
        };
    }
    getSetPassword(accountId) {
        return {
            title: 'Set Password',
            accountId,
            layout: 'layouts/auth',
        };
    }
    getResetPassword(token) {
        return {
            title: 'Reset Password',
            token,
            layout: 'layouts/auth',
        };
    }
    getForgotPassword() {
        return {
            title: 'Forgot Password',
            layout: 'layouts/auth',
        };
    }
    async register(registerDto) {
        return await this.authService.register(registerDto);
    }
    async verifyEmail(token) {
        return await this.authService.verifyEmail(token);
    }
    async setPassword(accountId, setPasswordDto) {
        return await this.authService.setPassword(accountId, setPasswordDto);
    }
    async login(loginDto, res) {
        const logger = new common_1.Logger('AuthDebug');
        logger.log(`Attempting login for: ${loginDto.email}`);
        const result = await this.authService.login(loginDto);
        logger.log(`Login Service result for ${loginDto.email}: Role -> ${result.user?.role}`);
        res.cookie('accessToken', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });
        logger.log('AccessToken cookie set in response');
        if (result.user) {
            const roleRedirectMap = {
                [account_schema_1.AccountRole.ADMIN]: '/dashboard/admin',
                [account_schema_1.AccountRole.STAFF]: '/dashboard/staff',
                [account_schema_1.AccountRole.HOSTEL_MANAGER]: '/dashboard/hostel',
                [account_schema_1.AccountRole.HOTEL_MANAGER]: '/dashboard/hotel',
                [account_schema_1.AccountRole.PROPERTY_MANAGER]: '/dashboard/rentals',
                [account_schema_1.AccountRole.INDIVIDUAL]: '/',
            };
            const targetPath = roleRedirectMap[result.user.role] || '/dashboard';
            result.redirect = targetPath;
            logger.log(`Role: ${result.user.role} -> Redirecting to: ${targetPath}`);
        }
        return result;
    }
    async forgotPassword(email) {
        return await this.authService.initiatePasswordReset(email);
    }
    async resetPassword(token, resetPasswordDto) {
        return await this.authService.resetPassword(token, resetPasswordDto);
    }
    async validateToken(req) {
        return { valid: true, user: req.user };
    }
    async getCurrentUser(req) {
        const user = await this.authService.getAccountById(req.user.userId);
        return user;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('register'),
    (0, common_1.Render)('auth/register'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getRegister", null);
__decorate([
    (0, common_1.Get)('login'),
    (0, common_1.Render)('auth/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getLogin", null);
__decorate([
    (0, common_1.Get)('verify-email'),
    (0, common_1.Render)('auth/verify-email'),
    __param(0, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getVerifyEmail", null);
__decorate([
    (0, common_1.Get)('set-password'),
    (0, common_1.Render)('auth/set-password'),
    __param(0, (0, common_1.Query)('accountId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getSetPassword", null);
__decorate([
    (0, common_1.Get)('reset-password'),
    (0, common_1.Render)('auth/reset-password'),
    __param(0, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getResetPassword", null);
__decorate([
    (0, common_1.Get)('forgot-password'),
    (0, common_1.Render)('auth/forgot-password'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getForgotPassword", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('verify-email'),
    __param(0, (0, common_1.Body)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Post)('set-password'),
    __param(0, (0, common_1.Query)('accountId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, set_password_dto_1.SetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "setPassword", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)('token')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Get)('validate-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "validateToken", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getCurrentUser", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map