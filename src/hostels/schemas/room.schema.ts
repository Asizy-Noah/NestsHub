import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum RoomType {
  SINGLE = 'single',
  DOUBLE = 'double',
  TRIPLE = 'triple',
  DORMITORY = 'dormitory',
}

export enum CookingPolicy {
  ELECTRICITY = 'electricity',
  CHARCOAL = 'charcoal',
  GAS = 'gas',
  NOT_ALLOWED = 'not_allowed',
}

@Schema({ timestamps: true })
export class Room extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Hostel', required: true })
  hostelId: Types.ObjectId;

  @Prop({ type: String, enum: Object.values(RoomType), required: true })
  type: RoomType;

  @Prop({ required: true })
  roomNumber: string;

  @Prop({ required: true })
  floor: number;

  @Prop({ default: false })
  isSelfContained: boolean;

  @Prop({ type: String, enum: Object.values(CookingPolicy), default: CookingPolicy.NOT_ALLOWED })
  cookingPolicy: CookingPolicy;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop()
  pricePerMonth: number;

  @Prop({ default: 0 })
  capacity: number; // Number of beds

  @Prop({ default: false })
  isAvailable: boolean;

  @Prop()
  description: string;

  @Prop({ type: [String], default: [] })
  amenities: string[]; // e.g., ['fan', 'window', 'desk', 'bed']

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);

// Indexes
RoomSchema.index({ hostelId: 1 });
RoomSchema.index({ type: 1 });
RoomSchema.index({ isAvailable: 1 });
RoomSchema.index({ createdAt: -1 });
