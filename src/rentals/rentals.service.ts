import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RentalProperty } from './schemas/rental-property.schema';
import { RentalProfile } from './schemas/rental-profile.schema';

@Injectable()
export class RentalsService {
  constructor(
    @InjectModel(RentalProperty.name) private rentalModel: Model<RentalProperty>,
    @InjectModel(RentalProfile.name) private profileModel: Model<RentalProfile>,
  ) {}

  // --- DASHBOARD DATA ---
  async getDashboardData(managerId: string) {
    const rentals = await this.rentalModel.find({ managerId });
    return { rentals };
  }

  // --- PROFILE MANAGEMENT ---
  async getProfile(managerId: string) {
    let profile = await this.profileModel.findOne({ managerId });
    if (!profile) {
      profile = await this.profileModel.create({ managerId });
    }
    return profile;
  }

  async updateProfile(managerId: string, data: any) {
    return await this.profileModel.findOneAndUpdate(
      { managerId }, { $set: data }, { new: true, upsert: true }
    );
  }

  // --- RENTAL UNIT MANAGEMENT ---
  async addRental(managerId: string, data: any) {
    const newRental = new this.rentalModel({ ...data, managerId, availableUnits: data.totalUnits });
    return await newRental.save();
  }

  async updateRental(rentalId: string, managerId: string, data: any) {
    const { _id, managerId: mid, ...updateData } = data; // Strip immutable fields
    
    // Safety check for availability capping
    if (updateData.totalUnits < updateData.availableUnits) {
      updateData.availableUnits = updateData.totalUnits;
    }

    const updated = await this.rentalModel.findOneAndUpdate(
      { _id: rentalId, managerId }, { $set: updateData }, { new: true }
    );
    if (!updated) throw new NotFoundException('Rental not found');
    return updated;
  }

  async deleteRental(rentalId: string, managerId: string) {
    const result = await this.rentalModel.findOneAndDelete({ _id: rentalId, managerId });
    if (!result) throw new NotFoundException('Rental not found');
    return { success: true };
  }

  async updateUnitQuantity(rentalId: string, managerId: string, change: number) {
    const rental = await this.rentalModel.findOne({ _id: rentalId, managerId });
    if (!rental) throw new NotFoundException('Rental not found');

    const newAvail = rental.availableUnits + change;
    if (newAvail < 0 || newAvail > rental.totalUnits) throw new BadRequestException('Invalid quantity');

    rental.availableUnits = newAvail;
    return await rental.save();
  }
}