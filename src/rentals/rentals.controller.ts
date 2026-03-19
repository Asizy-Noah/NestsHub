import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RentalsService } from './rentals.service';
import { CreateRentalDto, UpdateRentalDto } from './dto/create-rental.dto';

@Controller('api/rentals')
@UseGuards(JwtAuthGuard)
export class RentalsController {
  constructor(private rentalsService: RentalsService) {}

  @Post()
  async createRental(@Request() req: any, @Body() createRentalDto: CreateRentalDto) {
    // Allow PROPERTY_OWNER and PROPERTY_BROKER roles
    if (!['PROPERTY_OWNER', 'PROPERTY_BROKER'].includes(req.user.role)) {
      throw new BadRequestException('Only property owners and brokers can create rentals');
    }

    return this.rentalsService.createRental(req.user.id, createRentalDto);
  }

  @Get('my-properties')
  async getMyRentals(
    @Request() req: any,
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    if (!['PROPERTY_OWNER', 'PROPERTY_BROKER'].includes(req.user.role)) {
      throw new BadRequestException('Access denied');
    }

    return this.rentalsService.getRentalsByManager(req.user.id, limit, offset);
  }

  @Get('dashboard/stats')
  async getDashboardStats(@Request() req: any) {
    if (!['PROPERTY_OWNER', 'PROPERTY_BROKER'].includes(req.user.role)) {
      throw new BadRequestException('Access denied');
    }

    return this.rentalsService.getDashboardStats(req.user.id);
  }

  @Get('search')
  async searchRentals(
    @Query('q') query?: string,
    @Query('type') houseType?: string,
    @Query('city') city?: string,
    @Query('town') town?: string,
    @Query('verified') verified?: boolean,
    @Query('limit') limit: number = 20,
    @Query('offset') offset: number = 0,
  ) {
    return this.rentalsService.searchRentals(
      query,
      houseType,
      city,
      town,
      verified,
      limit,
      offset,
    );
  }

  @Get('verified')
  async getVerifiedRentals(
    @Query('limit') limit: number = 20,
    @Query('offset') offset: number = 0,
  ) {
    return this.rentalsService.getVerifiedRentals(limit, offset);
  }

  @Get(':id')
  async getRentalById(@Param('id') id: string) {
    return this.rentalsService.getRentalById(id);
  }

  @Put(':id')
  async updateRental(
    @Param('id') id: string,
    @Request() req: any,
    @Body() updateRentalDto: UpdateRentalDto,
  ) {
    if (!['PROPERTY_OWNER', 'PROPERTY_BROKER'].includes(req.user.role)) {
      throw new BadRequestException('Access denied');
    }

    return this.rentalsService.updateRental(id, req.user.id, updateRentalDto);
  }

  @Delete(':id')
  async deleteRental(@Param('id') id: string, @Request() req: any) {
    if (!['PROPERTY_OWNER', 'PROPERTY_BROKER'].includes(req.user.role)) {
      throw new BadRequestException('Access denied');
    }

    await this.rentalsService.deleteRental(id, req.user.id);
    return { message: 'Rental property deleted successfully' };
  }

  @Put(':id/active')
  async toggleRentalActive(
    @Param('id') id: string,
    @Request() req: any,
    @Body() body: { isActive: boolean },
  ) {
    if (!['PROPERTY_OWNER', 'PROPERTY_BROKER'].includes(req.user.role)) {
      throw new BadRequestException('Access denied');
    }

    return this.rentalsService.toggleRentalActive(id, req.user.id, body.isActive);
  }

  @Post(':id/apply-verification')
  async applyForVerification(@Param('id') id: string, @Request() req: any) {
    if (!['PROPERTY_OWNER', 'PROPERTY_BROKER'].includes(req.user.role)) {
      throw new BadRequestException('Access denied');
    }

    return this.rentalsService.applyForVerification(id, req.user.id);
  }

  @Post(':id/upload-proof')
  async uploadVerificationProof(
    @Param('id') id: string,
    @Request() req: any,
    @Body() body: { proofUrl: string },
  ) {
    if (!['PROPERTY_OWNER', 'PROPERTY_BROKER'].includes(req.user.role)) {
      throw new BadRequestException('Access denied');
    }

    return this.rentalsService.uploadVerificationProof(id, req.user.id, body.proofUrl);
  }
}
