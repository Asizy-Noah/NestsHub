import { Controller, Get, Post, Put, Delete, Body, Param, Render, UseGuards, Req, Query } from '@nestjs/common';
import { HostelsService } from './hostels.service';
import { CreateHostelDto, UpdateHostelDto, ApplyVerificationDto } from './dto/create-hostel.dto';
import { CreateRoomDto, UpdateRoomDto } from './dto/create-room.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('dashboard/hostels')
export class HostelsController {
  constructor(private readonly hostelService: HostelsService) {}

  @Get()
  @Render('hostels/dashboard')
  getHostelDashboard() {
    return { title: 'Hostel Dashboard' };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createHostel(@Req() req: any, @Body() createHostelDto: CreateHostelDto) {
    return this.hostelService.createHostel(req.user.sub, createHostelDto);
  }

  @Get('my-hostel')
  @UseGuards(JwtAuthGuard)
  async getMyHostel(@Req() req: any) {
    return this.hostelService.findHostelByManager(req.user.sub);
  }

  @Get('search')
  async searchHostels(@Query('q') query: string, @Query('skip') skip = 0, @Query('limit') limit = 10) {
    return this.hostelService.searchHostels(query, skip, limit);
  }

  @Get('verified')
  async getVerifiedHostels(@Query('skip') skip = 0, @Query('limit') limit = 10) {
    return this.hostelService.getVerifiedHostels(skip, limit);
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  async getHostelStats(@Req() req: any) {
    return this.hostelService.getHostelStats(req.user.sub);
  }

  /* @Get()
  async getAllHostels(@Query('skip') skip = 0, @Query('limit') limit = 10) {
    return this.hostelService.getAllHostels(skip, limit);
  } */

  @Get(':id')
  async getHostelById(@Param('id') id: string) {
    return this.hostelService.findHostelById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateHostel(
    @Param('id') id: string,
    @Req() req: any,
    @Body() updateHostelDto: UpdateHostelDto,
  ) {
    return this.hostelService.updateHostel(id, req.user.sub, updateHostelDto);
  }

  @Post(':id/apply-verification')
  @UseGuards(JwtAuthGuard)
  async applyVerification(
    @Param('id') id: string,
    @Req() req: any,
    @Body() applyVerificationDto: ApplyVerificationDto,
  ) {
    return this.hostelService.applyVerification(id, req.user.sub, applyVerificationDto);
  }

  // Room endpoints
  @Post(':hostelId/rooms')
  @UseGuards(JwtAuthGuard)
  async createRoom(
    @Param('hostelId') hostelId: string,
    @Req() req: any,
    @Body() createRoomDto: CreateRoomDto,
  ) {
    return this.hostelService.createRoom(hostelId, req.user.sub, createRoomDto);
  }

  @Get(':hostelId/rooms')
  async getRoomsByHostel(@Param('hostelId') hostelId: string) {
    return this.hostelService.getRoomsByHostel(hostelId);
  }

  @Get(':hostelId/rooms/:roomId')
  async getRoomById(@Param('roomId') roomId: string) {
    return this.hostelService.getRoomById(roomId);
  }

  @Put(':hostelId/rooms/:roomId')
  @UseGuards(JwtAuthGuard)
  async updateRoom(
    @Param('hostelId') hostelId: string,
    @Param('roomId') roomId: string,
    @Req() req: any,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return this.hostelService.updateRoom(roomId, hostelId, req.user.sub, updateRoomDto);
  }

  @Delete(':hostelId/rooms/:roomId')
  @UseGuards(JwtAuthGuard)
  async deleteRoom(
    @Param('hostelId') hostelId: string,
    @Param('roomId') roomId: string,
    @Req() req: any,
  ) {
    await this.hostelService.deleteRoom(roomId, hostelId, req.user.sub);
    return { message: 'Room deleted successfully' };
  }
}
