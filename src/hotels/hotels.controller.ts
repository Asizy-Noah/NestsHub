import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HotelsService } from './hotels.service';
import { CreateHotelDto, UpdateHotelDto } from './dto/create-hotel.dto';
import { CreateHotelRoomDto, UpdateHotelRoomDto, UpdateRoomInventoryDto } from './dto/create-hotel-room.dto';

@Controller('api/hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  // Hotel Management Endpoints
  @Post()
  @UseGuards(JwtAuthGuard)
  async createHotel(@Request() req: any, @Body() createHotelDto: CreateHotelDto) {
    return this.hotelsService.createHotel(req.user.sub, createHotelDto);
  }

  @Get('my-hotel')
  @UseGuards(JwtAuthGuard)
  async getMyHotel(@Request() req: any) {
    return this.hotelsService.getHotelByManager(req.user.sub);
  }

  @Get(':id')
  async getHotelById(@Param('id') id: string) {
    return this.hotelsService.getHotelById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateHotel(
    @Param('id') id: string,
    @Request() req: any,
    @Body() updateHotelDto: UpdateHotelDto,
  ) {
    return this.hotelsService.updateHotel(id, req.user.sub, updateHotelDto);
  }

  @Put(':id/amenities')
  @UseGuards(JwtAuthGuard)
  async updateAmenities(
    @Param('id') id: string,
    @Request() req: any,
    @Body() amenities: any,
  ) {
    return this.hotelsService.updateHotelAmenities(id, req.user.sub, amenities);
  }

  @Post(':id/apply-verification')
  @UseGuards(JwtAuthGuard)
  async applyForVerification(@Param('id') id: string, @Request() req: any) {
    return this.hotelsService.applyForVerification(id, req.user.sub);
  }

  @Put(':id/toggle-active')
  @UseGuards(JwtAuthGuard)
  async toggleActive(
    @Param('id') id: string,
    @Request() req: any,
    @Body() body: { isActive: boolean },
  ) {
    return this.hotelsService.toggleHotelActive(id, req.user.sub, body.isActive);
  }

  @Get()
  async searchHotels(
    @Query('q') query?: string,
    @Query('district') district?: string,
    @Query('town') townOrCity?: string,
    @Query('verified') verified?: string,
  ) {
    const isVerified = verified === 'true' ? true : verified === 'false' ? false : undefined;
    return this.hotelsService.searchHotels(query || '', district, townOrCity, isVerified);
  }

  @Get('verified/list')
  async getVerifiedHotels() {
    return this.hotelsService.getVerifiedHotels();
  }

  @Get('dashboard/stats')
  @UseGuards(JwtAuthGuard)
  async getDashboardStats(@Request() req: any) {
    return this.hotelsService.getDashboardStats(req.user.sub);
  }

  // Room Management Endpoints
  @Post(':hotelId/rooms')
  @UseGuards(JwtAuthGuard)
  async createRoom(
    @Param('hotelId') hotelId: string,
    @Request() req: any,
    @Body() createRoomDto: CreateHotelRoomDto,
  ) {
    return this.hotelsService.createRoom(hotelId, req.user.sub, createRoomDto);
  }

  @Get(':hotelId/rooms')
  async getRoomsByHotel(@Param('hotelId') hotelId: string) {
    return this.hotelsService.getRoomsByHotel(hotelId);
  }

  @Get('rooms/:roomId')
  async getRoomById(@Param('roomId') roomId: string) {
    return this.hotelsService.getRoomById(roomId);
  }

  @Put(':hotelId/rooms/:roomId')
  @UseGuards(JwtAuthGuard)
  async updateRoom(
    @Param('hotelId') hotelId: string,
    @Param('roomId') roomId: string,
    @Request() req: any,
    @Body() updateRoomDto: UpdateHotelRoomDto,
  ) {
    return this.hotelsService.updateRoom(roomId, hotelId, req.user.sub, updateRoomDto);
  }

  @Put(':hotelId/rooms/:roomId/inventory')
  @UseGuards(JwtAuthGuard)
  async updateRoomInventory(
    @Param('hotelId') hotelId: string,
    @Param('roomId') roomId: string,
    @Request() req: any,
    @Body() inventoryDto: UpdateRoomInventoryDto,
  ) {
    return this.hotelsService.updateRoomInventory(
      roomId,
      hotelId,
      req.user.sub,
      inventoryDto,
    );
  }

  @Delete(':hotelId/rooms/:roomId')
  @UseGuards(JwtAuthGuard)
  async deleteRoom(
    @Param('hotelId') hotelId: string,
    @Param('roomId') roomId: string,
    @Request() req: any,
  ) {
    return this.hotelsService.deleteRoom(roomId, hotelId, req.user.sub);
  }

  @Put(':hotelId/rooms/:roomId/toggle-active')
  @UseGuards(JwtAuthGuard)
  async toggleRoomActive(
    @Param('hotelId') hotelId: string,
    @Param('roomId') roomId: string,
    @Request() req: any,
    @Body() body: { isActive: boolean },
  ) {
    return this.hotelsService.toggleRoomActive(
      roomId,
      hotelId,
      req.user.sub,
      body.isActive,
    );
  }
}
