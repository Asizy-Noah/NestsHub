import { Model } from 'mongoose';
import { Account } from './schemas/account.schema';
export declare class AccountsService {
    private accountModel;
    constructor(accountModel: Model<Account>);
    getAccountById(id: string): Promise<import("mongoose").Document<unknown, {}, Account, {}, {}> & Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateAccount(id: string, data: any): Promise<import("mongoose").Document<unknown, {}, Account, {}, {}> & Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getAllAccounts(role?: string): Promise<(import("mongoose").Document<unknown, {}, Account, {}, {}> & Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    countAccountsByRole(role: string): Promise<number>;
    changePassword(id: string, data: any): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteAccount(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
//# sourceMappingURL=accounts.service.d.ts.map