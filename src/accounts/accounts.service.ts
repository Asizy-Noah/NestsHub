import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './schemas/account.schema';
import { UpdateAccountDto } from './dto/update-account.dto';
import * as bcrypt from 'bcrypt';

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

  async updateAccount(id: string, data: any) {
    // Exclude password from general updates for security
    delete data.password;
    const updated = await this.accountModel.findByIdAndUpdate(
      id, { $set: data }, { new: true }
    ).select('-password');
    if (!updated) throw new NotFoundException('Account not found');
    return updated;
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

  async changePassword(id: string, data: any) {
    const account = await this.accountModel.findById(id);
    if (!account) throw new NotFoundException('Account not found');

    // FIX: Check if password exists to satisfy TypeScript
    if (!account.password) {
        throw new BadRequestException('Account does not have a password set');
    }
    
    const isMatch = await bcrypt.compare(data.currentPassword, account.password);
    if (!isMatch) throw new BadRequestException('Invalid current password');

    const salt = await bcrypt.genSalt();
    account.password = await bcrypt.hash(data.newPassword, salt);
    await account.save();
    
    return { success: true, message: 'Password updated successfully' };
}

async deleteAccount(id: string) {
  const result = await this.accountModel.findByIdAndDelete(id);
  if (!result) throw new NotFoundException('Account not found');
  return { success: true, message: 'Account permanently deleted' };
}
}
