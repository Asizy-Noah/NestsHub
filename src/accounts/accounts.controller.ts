import { Controller, Get, Patch, Delete, Body, Param, UseGuards, Request, Render, Query } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { UpdateAccountDto } from './dto/update-account.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  // Frontend Routes
  @Get('dashboard')
  @UseGuards(JwtAuthGuard)
  @Render('accounts/dashboard')
  getDashboard(@Request() req: any) {
    return {
      title: 'Dashboard - Real Estate',
      user: req.user,
    };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @Render('accounts/profile')
  getProfile(@Request() req: any) {
    return {
      title: 'Profile - Real Estate',
      user: req.user,
      layout: 'layouts/hostel'
    };
  }

  @Get('settings')
  @UseGuards(JwtAuthGuard)
  @Render('accounts/settings')
  getSettings(@Request() req: any) {
    return {
      title: 'Settings - Real Estate',
      user: req.user,
    };
  }

  // API Routes
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getAccount(@Param('id') id: string) {
    return await this.accountsService.getAccountById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateAccount(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return await this.accountsService.updateAccount(id, updateAccountDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteAccount(@Param('id') id: string) {
    return await this.accountsService.deleteAccount(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllAccounts(@Query('role') role?: string) {
    return await this.accountsService.getAllAccounts(role);
  }
}
