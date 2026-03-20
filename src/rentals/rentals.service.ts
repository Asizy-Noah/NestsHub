import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RentalProperty, VerificationStatus } from './schemas/rental-property.schema';
import { CreateRentalDto, UpdateRentalDto } from './dto/create-rental.dto';

@Injectable()
export class RentalsService {
  constructor(
    @InjectModel(RentalProperty.name)
    private rentalPropertyModel: Model<RentalProperty>,
  ) {}

  async createRental(
    managerId: string,
    createRentalDto: CreateRentalDto,
  ): Promise<RentalProperty> {
    const rental = new this.rentalPropertyModel({
      ...createRentalDto,
      managerId,
      verificationStatus: VerificationStatus.UNVERIFIED,
    });

    return rental.save();
  }

  async getRentalById(id: string): Promise<RentalProperty> {
    const rental = await this.rentalPropertyModel.findById(id).populate('managerId');
    if (!rental) {
      throw new NotFoundException('Rental property not found');
    }
    return rental;
  }

  async getRentalsByManager(
    managerId: string,
    limit: number = 10,
    offset: number = 0,
  ): Promise<{ rentals: RentalProperty[]; total: number }> {
    const total = await this.rentalPropertyModel.countDocuments({ managerId });
    const rentals = await this.rentalPropertyModel
      .find({ managerId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset);

    return { rentals, total };
  }

  async updateRental(
    rentalId: string,
    managerId: string,
    updateRentalDto: UpdateRentalDto,
  ): Promise<RentalProperty> {
    const rental = await this.getRentalById(rentalId);

    if (rental.managerId.toString() !== managerId) {
      throw new ForbiddenException('You can only update your own rental properties');
    }

    return this.rentalPropertyModel.findByIdAndUpdate(rentalId, updateRentalDto, {
      new: true,
      runValidators: true,
    })as any;
  }

  async deleteRental(rentalId: string, managerId: string): Promise<void> {
    const rental = await this.getRentalById(rentalId);

    if (rental.managerId.toString() !== managerId) {
      throw new ForbiddenException('You can only delete your own rental properties');
    }

    await this.rentalPropertyModel.findByIdAndDelete(rentalId);
  }

  async toggleRentalActive(
    rentalId: string,
    managerId: string,
    isActive: boolean,
  ): Promise<RentalProperty> {
    const rental = await this.getRentalById(rentalId);

    if (rental.managerId.toString() !== managerId) {
      throw new ForbiddenException('You can only toggle your own rental properties');
    }

    return this.rentalPropertyModel.findByIdAndUpdate(
      rentalId,
      { isActive },
      { new: true },
    )as any;
  }

  async applyForVerification(rentalId: string, managerId: string): Promise<RentalProperty> {
    const rental = await this.getRentalById(rentalId);

    if (rental.managerId.toString() !== managerId) {
      throw new ForbiddenException('You can only apply for your own properties');
    }

    if (rental.verificationStatus === VerificationStatus.PENDING) {
      throw new BadRequestException('Verification application already pending');
    }

    if (rental.verificationStatus === VerificationStatus.VERIFIED) {
      throw new BadRequestException('Property is already verified');
    }

    return this.rentalPropertyModel.findByIdAndUpdate(
      rentalId,
      {
        verificationStatus: VerificationStatus.PENDING,
        verificationAppliedAt: new Date(),
      },
      { new: true },
    )as any;
  }

  async uploadVerificationProof(
    rentalId: string,
    managerId: string,
    proofUrl: string,
  ): Promise<RentalProperty> {
    const rental = await this.getRentalById(rentalId);

    if (rental.managerId.toString() !== managerId) {
      throw new ForbiddenException('You can only upload proof for your own properties');
    }

    return this.rentalPropertyModel.findByIdAndUpdate(
      rentalId,
      {
        verificationProofUrl: proofUrl,
      },
      { new: true },
    )as any;
  }

  async searchRentals(
    query?: string,
    houseType?: string,
    city?: string,
    town?: string,
    verified?: boolean,
    limit: number = 20,
    offset: number = 0,
  ): Promise<{ rentals: RentalProperty[]; total: number }> {
    const filters: any = { isActive: true };

    if (query) {
      filters.$or = [
        { propertyName: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { nearestRoad: { $regex: query, $options: 'i' } },
      ];
    }

    if (houseType) filters.houseType = houseType;
    if (city) filters.nearestCity = { $regex: city, $options: 'i' };
    if (town) filters.nearestTown = { $regex: town, $options: 'i' };

    if (verified !== undefined) {
      filters.verificationStatus = verified
        ? VerificationStatus.VERIFIED
        : { $ne: VerificationStatus.VERIFIED };
    }

    const total = await this.rentalPropertyModel.countDocuments(filters);
    const rentals = await this.rentalPropertyModel
      .find(filters)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset)
      .populate('managerId', 'firstName lastName email telephone');

    return { rentals, total };
  }

  async getVerifiedRentals(
    limit: number = 20,
    offset: number = 0,
  ): Promise<{ rentals: RentalProperty[]; total: number }> {
    const total = await this.rentalPropertyModel.countDocuments({
      verificationStatus: VerificationStatus.VERIFIED,
      isActive: true,
    });

    const rentals = await this.rentalPropertyModel
      .find({
        verificationStatus: VerificationStatus.VERIFIED,
        isActive: true,
      })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset)
      .populate('managerId', 'firstName lastName email telephone');

    return { rentals, total };
  }

  async getDashboardStats(managerId: string): Promise<any> {
    const totalProperties = await this.rentalPropertyModel.countDocuments({ managerId });

    const verifiedCount = await this.rentalPropertyModel.countDocuments({
      managerId,
      verificationStatus: VerificationStatus.VERIFIED,
    });

    const pendingVerificationCount = await this.rentalPropertyModel.countDocuments({
      managerId,
      verificationStatus: VerificationStatus.PENDING,
    });

    const activeCount = await this.rentalPropertyModel.countDocuments({
      managerId,
      isActive: true,
    });

    const propertyTypes = await this.rentalPropertyModel.aggregate([
      { $match: { managerId: new Types.ObjectId(managerId) } },
      { $group: { _id: '$houseType', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const recentProperties = await this.rentalPropertyModel
      .find({ managerId })
      .sort({ createdAt: -1 })
      .limit(5);

    return {
      overview: {
        totalProperties,
        verifiedCount,
        pendingVerificationCount,
        activeCount,
      },
      propertyTypes,
      recentProperties,
    };
  }
}
