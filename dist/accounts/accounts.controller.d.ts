import { AccountsService } from './accounts.service';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
export declare class AccountsController {
    private accountsService;
    constructor(accountsService: AccountsService);
    getDashboard(req: any): {
        title: string;
        user: any;
    };
    getProfile(req: any): {
        title: string;
        user: any;
        layout: string;
    };
    getSettings(req: any): {
        title: string;
        user: any;
    };
    updateProfile(req: any, data: UpdateAccountDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/account.schema").Account, {}, {}> & import("./schemas/account.schema").Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    changePassword(req: any, data: ChangePasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteAccount(req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    getAccount(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/account.schema").Account, {}, {}> & import("./schemas/account.schema").Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateAccount(id: string, updateAccountDto: UpdateAccountDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/account.schema").Account, {}, {}> & import("./schemas/account.schema").Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getAllAccounts(role?: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/account.schema").Account, {}, {}> & import("./schemas/account.schema").Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}
//# sourceMappingURL=accounts.controller.d.ts.map