import { AccountsService } from './accounts.service';
import { UpdateAccountDto } from './dto/update-account.dto';
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
    deleteAccount(id: string): Promise<{
        message: string;
    }>;
    getAllAccounts(role?: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/account.schema").Account, {}, {}> & import("./schemas/account.schema").Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}
//# sourceMappingURL=accounts.controller.d.ts.map