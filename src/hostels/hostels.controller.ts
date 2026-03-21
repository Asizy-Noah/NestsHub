import { Controller, Get, Post, Patch, Body, Delete, Param, Render, Request, UseGuards } from '@nestjs/common';
import { HostelsService } from './hostels.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AccountRole } from '../accounts/schemas/account.schema';

@Controller('dashboard/hostel')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(AccountRole.HOSTEL_MANAGER) // Ensures only hostel managers access this
export class HostelsController {
  constructor(private readonly hostelsService: HostelsService) {}

  @Get()
  @Render('hostels/dashboard')
  async getDashboard(@Request() req: any) {
    const managerId = req.user.userId;
    // We pass the data to the EJS template to hydrate Alpine.js
    const hostelData = await this.hostelsService.getHostelDataByManager(managerId);
    return {
      title: 'Hostel Manager Dashboard',
      layout: 'layouts/hostel',
      manager: req.user,
      hostelData: JSON.stringify(hostelData) // Pass as JSON for Alpine
    };
  }

  @Patch('update') 
  async updateHostel(@Request() req: any, @Body() data: any) {
    return await this.hostelsService.updateHostel(req.user.userId, data);
  }

  @Patch('verify')
  async applyForVerification(@Request() req: any) {
    return await this.hostelsService.applyVerification(req.user.userId);
  }

  @Post('rooms')
  async addRoom(@Request() req: any, @Body() roomData: any) {
    return await this.hostelsService.addRoom(req.user.userId, roomData);
  }

  // UPDATE EXISTING ROOM (PATCH)
  @Patch('rooms/:roomId')
  async updateRoom(
    @Request() req: any, 
    @Param('roomId') roomId: string, 
    @Body() roomData: any
  ) {
    return await this.hostelsService.updateRoom(roomId, req.user.userId, roomData);
  }

  @Patch('rooms/:roomId/quantity')
  async updateRoomQuantity(
    @Request() req: any, 
    @Param('roomId') roomId: string, 
    @Body('change') change: number
  ) {
    // change will be +1 or -1 from the frontend
    return await this.hostelsService.updateRoomQuantity(roomId, req.user.userId, change);
  }

  // DELETE ROOM GROUP (DELETE)
  @Delete('rooms/:roomId')
  async deleteRoom(@Request() req: any, @Param('roomId') roomId: string) {
    return await this.hostelsService.deleteRoom(roomId, req.user.userId);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AccountRole.HOSTEL_MANAGER)
  @Render('hostels/profile')
  async getProfileView(@Request() req: any) {
    const account = await this.hostelsService.getManagerAccount(req.user.userId);
    return { title: 'Manager Profile', layout: 'layouts/hostel', manager: req.user, account: JSON.stringify(account) };
  }

  @Get('reviews')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AccountRole.HOSTEL_MANAGER)
  @Render('hostels/reviews')
  getReviewsView(@Request() req: any) {
    return { title: 'Hostel Reviews', layout: 'layouts/hostel', manager: req.user };
  }
}