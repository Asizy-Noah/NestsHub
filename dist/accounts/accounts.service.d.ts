import { Model } from 'mongoose';
import { Account } from './schemas/account.schema';
import { UpdateAccountDto } from './dto/update-account.dto';
export declare class AccountsService {
    private accountModel;
    constructor(accountModel: Model<Account>);
    getAccountById(id: string): Promise<import("mongoose").Document<unknown, {}, Account, {}, {}> & Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateAccount(id: string, updateAccountDto: UpdateAccountDto): Promise<import("mongoose").Document<unknown, {}, Account, {}, {}> & Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    deleteAccount(id: string): Promise<{
        message: string;
    }>;
    getAllAccounts(role?: string): Promise<(import("mongoose").Document<unknown, {}, Account, {}, {}> & Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    countAccountsByRole(role: string): Promise<number>;
}
//# sourceMappingURL=accounts.service.d.ts.map