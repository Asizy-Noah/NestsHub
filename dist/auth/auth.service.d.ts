import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Account, AccountRole } from '../accounts/schemas/account.schema';
import { EmailService } from './email.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
export declare class AuthService {
    private accountModel;
    private jwtService;
    private emailService;
    constructor(accountModel: Model<Account>, jwtService: JwtService, emailService: EmailService);
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
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            email: string;
            firstName: string;
            lastName: string;
            role: AccountRole;
        };
    }>;
    initiatePasswordReset(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    validateToken(token: string): Promise<any>;
    getAccountById(id: string): Promise<(import("mongoose").Document<unknown, {}, Account, {}, {}> & Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
//# sourceMappingURL=auth.service.d.ts.map