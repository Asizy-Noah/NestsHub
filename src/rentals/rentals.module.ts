import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './rentals.service';
import { RentalProperty, RentalPropertySchema } from './schemas/rental-property.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RentalProperty.name, schema: RentalPropertySchema },
    ]),
  ],
  controllers: [RentalsController],
  providers: [RentalsService],
  exports: [RentalsService],
})
export class RentalsModule {}
