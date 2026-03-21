import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class RentalProperty extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true })
  managerId!: mongoose.Schema.Types.ObjectId;

  // 1. Unit Attributes
  @Prop({ required: true }) category!: string;
  @Prop({ required: true }) floorLevel!: number;
  @Prop({ required: true }) totalUnits!: number;
  @Prop({ required: true }) availableUnits!: number;
  @Prop({ required: true }) price!: number;
  @Prop({ required: true }) rateType!: string;
  
  @Prop({ default: false }) isSelfContained!: boolean;
  @Prop({ default: false }) accessiblePWD!: boolean;
  @Prop({ default: false }) hasVeranda!: boolean;
  @Prop({ default: false }) hasBalcony!: boolean;
  @Prop({ default: false }) hasAC!: boolean;
  @Prop({ default: false }) hotWater!: boolean;
  @Prop({ default: false }) paidWater!: boolean;
  @Prop({ default: false }) paidElectricity!: boolean;
  @Prop({ default: false }) paidInternet!: boolean;
  
  @Prop({ default: false }) isFurnished!: boolean;
  @Prop({ type: [String], default: [] }) furnishing!: string[];
  @Prop({ type: [String], default: [] }) cookingMethods!: string[];
  @Prop({ type: [String], default: [] }) unitPhotos!: string[];

  // 2. Property Attributes
  @Prop({ default: 'Flats' }) propertyType!: string;
  @Prop({ default: false }) fenced!: boolean;
  @Prop({ default: false }) parking!: boolean;
  @Prop({ default: false }) backyard!: boolean;
  @Prop({ default: false }) largeCompound!: boolean;
  @Prop({ default: false }) greenery!: boolean;
  @Prop({ default: false }) cctvs!: boolean;
  @Prop({ default: false }) security!: boolean;
  @Prop({ default: false }) tarmackedAccess!: boolean;
  @Prop({ type: [String], default: [] }) propertyPhotos!: string[];

  // 3. Nearby Services
  @Prop({ default: false }) nearbyPharmacy!: boolean;
  @Prop({ default: false }) nearbyGym!: boolean;
  @Prop({ default: false }) nearbyGrocery!: boolean;
  @Prop({ default: false }) nearbyBodaboda!: boolean;
  @Prop({ default: '' }) hospitalName!: string;
  @Prop({ default: '' }) marketName!: string;
  @Prop({ type: [String], default: [] }) restaurantLevels!: string[];

  // 4. Location
  @Prop({ default: '' }) district!: string;
  @Prop({ default: '' }) division!: string;
  @Prop({ default: '' }) nearestTown!: string;
  @Prop({ default: 0 }) distanceToTown!: number;
  @Prop({ default: '' }) popularAreaName!: string;
  @Prop({ default: '' }) streetName!: string;
  @Prop({ default: 0 }) distanceToTarmac!: number;
}
export const RentalPropertySchema = SchemaFactory.createForClass(RentalProperty);