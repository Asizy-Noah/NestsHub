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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const account_schema_1 = require("./schemas/account.schema");
const bcrypt = __importStar(require("bcrypt"));
let AccountsService = class AccountsService {
    constructor(accountModel) {
        this.accountModel = accountModel;
    }
    async getAccountById(id) {
        const account = await this.accountModel.findById(id).select('-passwordHash');
        if (!account) {
            throw new common_1.NotFoundException('Account not found');
        }
        return account;
    }
    async updateAccount(id, data) {
        delete data.password;
        const updated = await this.accountModel.findByIdAndUpdate(id, { $set: data }, { new: true }).select('-password');
        if (!updated)
            throw new common_1.NotFoundException('Account not found');
        return updated;
    }
    async getAllAccounts(role) {
        const query = { deleted: false };
        if (role) {
            query['role'] = role;
        }
        return await this.accountModel.find(query).select('-passwordHash');
    }
    async countAccountsByRole(role) {
        return await this.accountModel.countDocuments({ role, deleted: false });
    }
    async changePassword(id, data) {
        const account = await this.accountModel.findById(id);
        if (!account)
            throw new common_1.NotFoundException('Account not found');
        if (!account.password) {
            throw new common_1.BadRequestException('Account does not have a password set');
        }
        const isMatch = await bcrypt.compare(data.currentPassword, account.password);
        if (!isMatch)
            throw new common_1.BadRequestException('Invalid current password');
        const salt = await bcrypt.genSalt();
        account.password = await bcrypt.hash(data.newPassword, salt);
        await account.save();
        return { success: true, message: 'Password updated successfully' };
    }
    async deleteAccount(id) {
        const result = await this.accountModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException('Account not found');
        return { success: true, message: 'Account permanently deleted' };
    }
};
exports.AccountsService = AccountsService;
exports.AccountsService = AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(account_schema_1.Account.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AccountsService);
//# sourceMappingURL=accounts.service.js.map