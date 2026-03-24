import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Room extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true })
  managerId!: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Hostel', required: true })
  hostelId!: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true }) type!: string;
  @Prop({ required: true, min: 1 }) totalRooms!: number;
  @Prop({ required: true, min: 0 }) availableRooms!: number;
  @Prop({ required: true }) floorLevel!: number;
  
  // Base Amenities
  @Prop({ default: false }) isSelfContained!: boolean;
  @Prop({ default: false }) hasBalcony!: boolean;
  @Prop({ default: false }) hasAC!: boolean;
  @Prop({ default: false }) isAccessible!: boolean;

  // Pricing Structure
  @Prop({ required: true }) price!: number;
  @Prop({ type: String, enum: ['Per Month', 'Per Quarter', 'Per Semester', 'Half Year', 'Per Year'], default: 'Per Semester' })
  pricingPeriod!: string;

  // Arrays for Policies & Amenities
  @Prop({ type: [String], default: [] }) cookingMethods!: string[]; // e.g. ['Gas', 'Electricity']
  @Prop({ type: Boolean, default: false }) isFurnished!: boolean;
  @Prop({ type: [String], default: [] }) furniture!: string[]; // e.g. ['Closet', 'Reading Table']

  // Photos
  @Prop({ type: [String], default: [] }) photos!: string[];
}
export const RoomSchema = SchemaFactory.createForClass(Room);