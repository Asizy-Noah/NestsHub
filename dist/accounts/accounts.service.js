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
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const account_schema_1 = require("./schemas/account.schema");
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
    async updateAccount(id, updateAccountDto) {
        const account = await this.accountModel.findByIdAndUpdate(id, { ...updateAccountDto, updatedAt: new Date() }, { new: true }).select('-passwordHash');
        if (!account) {
            throw new common_1.NotFoundException('Account not found');
        }
        return account;
    }
    async deleteAccount(id) {
        const account = await this.accountModel.findByIdAndUpdate(id, {
            deleted: true,
            deletedAt: new Date(),
            status: 'deleted',
        }, { new: true }).select('-passwordHash');
        if (!account) {
            throw new common_1.NotFoundException('Account not found');
        }
        return { message: 'Account deleted successfully' };
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
};
exports.AccountsService = AccountsService;
exports.AccountsService = AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(account_schema_1.Account.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AccountsService);
//# sourceMappingURL=accounts.service.js.map