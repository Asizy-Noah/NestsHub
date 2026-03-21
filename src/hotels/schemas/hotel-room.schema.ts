import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class HotelRoom extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true })
  hotelId!: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true }) type!: string;
  @Prop({ required: true, min: 1 }) totalRooms!: number;
  @Prop({ required: true, min: 0 }) availableRooms!: number;
  @Prop({ required: true }) floorLevel!: number;
  
  // Hotel Room Features
  @Prop({ default: false }) isSelfContained!: boolean;
  @Prop({ default: false }) hasBalcony!: boolean;
  @Prop({ default: false }) hasAC!: boolean;
  @Prop({ default: false }) isAccessible!: boolean;
  @Prop({ default: false }) bedAndBreakfast!: boolean;
  @Prop({ default: false }) workingTable!: boolean;
  @Prop({ default: false }) hotWater!: boolean;
  @Prop({ default: false }) hasTV!: boolean;

  // Pricing & Details
  @Prop({ required: true }) price!: number;
  @Prop({ type: String, default: 'Per Night' }) pricingPeriod!: string;
  @Prop({ type: String, default: 'Single Bed' }) bedSize!: string;

  @Prop({ type: [String], default: [] }) photos!: string[];
}
export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);