import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum RoomType {
  SINGLE = 'single',
  DOUBLE = 'double',
  SUITE = 'suite',
}

export enum BedSize {
  THREE_BY_SIX = '3x6',
  FOUR_BY_SIX = '4x6',
  SIX_BY_SIX = '6x6',
}

@Schema({ timestamps: true })
export class RoomAmenities extends Document {
  @Prop({ default: false })
  hasBalcony!: boolean;

  @Prop({ default: false })
  hasHotWater!: boolean;

  @Prop({ default: false })
  hasTV!: boolean;

  @Prop({ default: false })
  hasDSTV!: boolean;

  @Prop({ default: false })
  hasTableChair!: boolean;
}

const RoomAmenitiesSchema = SchemaFactory.createForClass(RoomAmenities);

@Schema({ timestamps: true })
export class HotelRoom extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Hotel', required: true })
  hotelId!: Types.ObjectId;

  @Prop()
  photo!: string;

  @Prop({ 
    type: String, 
    enum: Object.values(RoomType), 
    required: true 
  })
  roomType!: RoomType;

  @Prop({ default: false })
  isSelfContained!: boolean;

  @Prop({ min: 0, max: 10, default: 1 })
  floor!: number;

  @Prop({ type: RoomAmenitiesSchema })
  amenities!: RoomAmenities;

  @Prop({ 
    type: String, 
    enum: Object.values(BedSize), 
    required: true 
  })
  bedSize!: BedSize;

  @Prop({ required: true })
  costPerNight!: number;

  @Prop({ default: false })
  breakfastIncluded!: boolean;

  // Inventory Management
  @Prop({ required: true, min: 1 })
  totalRooms!: number;

  @Prop({ default: 0, min: 0 })
  bookedRooms!: number;

  // Virtual field computed
  get availableRooms(): number {
    return this.totalRooms - this.bookedRooms;
  }

  @Prop({ default: true })
  isActive!: boolean;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);

// Indexes
HotelRoomSchema.index({ hotelId: 1 });
HotelRoomSchema.index({ roomType: 1 });
HotelRoomSchema.index({ createdAt: -1 });
