import { Controller, Get, Post, Patch, Delete, Body, Param, Render, Request, UseGuards } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AccountRole } from '../accounts/schemas/account.schema';

@Controller('dashboard/rentals')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(AccountRole.PROPERTY_MANAGER) // Adjust this role to match your property manager role
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  // --- VIEWS ---
  @Get()
  @Render('rentals/dashboard')
  async getDashboard(@Request() req: any) {
    const data = await this.rentalsService.getDashboardData(req.user.userId);
    return { title: 'Rental Dashboard', layout: 'layouts/rental', manager: req.user, rentalData: JSON.stringify(data) };
  }

  @Get('profile')
  @Render('rentals/profile')
  async getProfileView(@Request() req: any) {
    const profile = await this.rentalsService.getProfile(req.user.userId);
    return { title: 'Manager Profile', layout: 'layouts/rental', manager: req.user, user: profile };
  }

  @Get('reviews')
  @Render('rentals/reviews')
  getReviewsView(@Request() req: any) {
    return { title: 'Public Reviews', layout: 'layouts/rental', manager: req.user };
  }

  // --- PROFILE API ---
  @Patch('profile/update')
  async updateProfile(@Request() req: any, @Body() data: any) {
    return await this.rentalsService.updateProfile(req.user.userId, data);
  }

  // --- RENTALS API ---
  @Post('items')
  async addRental(@Request() req: any, @Body() data: any) {
    return await this.rentalsService.addRental(req.user.userId, data);
  }

  @Patch('items/:id')
  async updateRental(@Request() req: any, @Param('id') id: string, @Body() data: any) {
    return await this.rentalsService.updateRental(id, req.user.userId, data);
  }

  @Delete('items/:id')
  async deleteRental(@Request() req: any, @Param('id') id: string) {
    return await this.rentalsService.deleteRental(id, req.user.userId);
  }

  @Patch('items/:id/quantity')
  async updateQuantity(@Request() req: any, @Param('id') id: string, @Body('change') change: number) {
    return await this.rentalsService.updateUnitQuantity(id, req.user.userId, change);
  }
}