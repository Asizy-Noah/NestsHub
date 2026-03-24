import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './rentals.service';
import { RentalProperty, RentalPropertySchema } from './schemas/rental-property.schema';
import { RentalProfile, RentalProfileSchema } from './schemas/rental-profile.schema'; // Added

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RentalProperty.name, schema: RentalPropertySchema },
      { name: RentalProfile.name, schema: RentalProfileSchema }, // Added
    ]),
  ],
  controllers: [RentalsController],
  providers: [RentalsService],
  exports: [RentalsService],
})
export class RentalsModule {}