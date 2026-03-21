import { Controller, Get, Post, Patch, Delete, Body, Param, Render, Request, UseGuards } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AccountRole } from '../accounts/schemas/account.schema';

@Controller('dashboard/hotel')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AccountRole.HOTEL_MANAGER)
  @Render('hotels/dashboard')
  async getDashboard(@Request() req: any) {
    const hotelData = await this.hotelsService.getHotelDataByManager(req.user.userId);
    return { title: 'Hotel Dashboard', layout: 'layouts/hotel', manager: req.user, hotelData: JSON.stringify(hotelData) };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AccountRole.HOTEL_MANAGER)
  @Patch('update')
  async updateHotel(@Request() req: any, @Body() data: any) {
    return await this.hotelsService.updateHotel(req.user.userId, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AccountRole.HOTEL_MANAGER)
  @Patch('verify')
  async applyForVerification(@Request() req: any) {
    return await this.hotelsService.applyVerification(req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AccountRole.HOTEL_MANAGER)
  @Post('rooms')
  async addRoom(@Request() req: any, @Body() roomData: any) {
    return await this.hotelsService.addRoom(req.user.userId, roomData);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AccountRole.HOTEL_MANAGER)
  @Patch('rooms/:roomId')
  async updateRoom(@Request() req: any, @Param('roomId') roomId: string, @Body() roomData: any) {
    return await this.hotelsService.updateRoom(roomId, req.user.userId, roomData);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AccountRole.HOTEL_MANAGER)
  @Delete('rooms/:roomId')
  async deleteRoom(@Request() req: any, @Param('roomId') roomId: string) {
    return await this.hotelsService.deleteRoom(roomId, req.user.userId);
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AccountRole.HOTEL_MANAGER)
  @Patch('rooms/:roomId/quantity')
  async updateRoomQuantity(@Request() req: any, @Param('roomId') roomId: string, @Body('change') change: number) {
    return await this.hotelsService.updateRoomQuantity(roomId, req.user.userId, change);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AccountRole.HOTEL_MANAGER)
  @Render('hotels/profile')
  async getProfileView(@Request() req: any) {
    const account = await this.hotelsService.getManagerAccount(req.user.userId);
    return { title: 'Manager Profile', layout: 'layouts/hotel', manager: req.user, account: JSON.stringify(account) };
  }

  @Get('reviews')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AccountRole.HOTEL_MANAGER)
  @Render('hotels/reviews')
  getReviewsView(@Request() req: any) {
    return { title: 'Hotel Reviews', layout: 'layouts/hotel', manager: req.user };
  }
}