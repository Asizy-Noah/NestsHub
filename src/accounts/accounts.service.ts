import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './schemas/account.schema';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(@InjectModel(Account.name) private accountModel: Model<Account>) {}

  async getAccountById(id: string) {
    const account = await this.accountModel.findById(id).select('-passwordHash');
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return account;
  }

  async updateAccount(id: string, updateAccountDto: UpdateAccountDto) {
    const account = await this.accountModel.findByIdAndUpdate(
      id,
      { ...updateAccountDto, updatedAt: new Date() },
      { new: true },
    ).select('-passwordHash');

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return account;
  }

  async deleteAccount(id: string) {
    const account = await this.accountModel.findByIdAndUpdate(
      id,
      {
        deleted: true,
        deletedAt: new Date(),
        status: 'deleted',
      },
      { new: true },
    ).select('-passwordHash');

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return { message: 'Account deleted successfully' };
  }

  async getAllAccounts(role?: string) {
    const query: any = { deleted: false };
    if (role) {
      query['role'] = role;
    }
    return await this.accountModel.find(query).select('-passwordHash');
  }

  async countAccountsByRole(role: string) {
    return await this.accountModel.countDocuments({ role, deleted: false });
  }
}
