import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AccountRole } from '@/accounts/schemas/account.schema';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    getRegister(): {
        title: string;
        roles: string[];
        layout: string;
    };
    getLogin(): {
        title: string;
        layout: string;
    };
    getVerifyEmail(token: string): {
        title: string;
        token: string;
        layout: string;
    };
    getSetPassword(accountId: string): {
        title: string;
        accountId: string;
        layout: string;
    };
    getResetPassword(token: string): {
        title: string;
        token: string;
        layout: string;
    };
    getForgotPassword(): {
        title: string;
        layout: string;
    };
    register(registerDto: RegisterDto): Promise<{
        message: string;
        accountId: import("mongoose").Types.ObjectId;
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
        accountId: import("mongoose").Types.ObjectId;
    }>;
    setPassword(accountId: string, setPasswordDto: SetPasswordDto): Promise<{
        message: string;
    }>;
    login(loginDto: LoginDto, res: Response): Promise<{
        accessToken: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            email: string;
            firstName: string;
            lastName: string;
            role: AccountRole;
        };
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    validateToken(req: any): Promise<{
        valid: boolean;
        user: any;
    }>;
    getCurrentUser(req: any): Promise<(import("mongoose").Document<unknown, {}, import("@/accounts/schemas/account.schema").Account, {}, {}> & import("@/accounts/schemas/account.schema").Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
//# sourceMappingURL=auth.controller.d.ts.map