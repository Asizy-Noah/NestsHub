import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Room extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Hostel', required: true })
  hostelId!: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, min: 1 })
  totalRooms!: number;

  @Prop({ required: true, min: 0 })
  availableRooms!: number; // THIS LINE FIXES THE ERROR

  @Prop([String]) photos!: string[];
  
  @Prop({ type: String, enum: ['Single', 'Double', 'Triple', 'Quad'], required: true })
  type!: string;

  @Prop({ default: false })
  isSelfContained!: boolean;

  @Prop({ required: true })
  floorLevel!: number;

  @Prop({ type: Object, default: { allowed: false, method: 'None' } })
  cooking!: { allowed: boolean; method: string };

  @Prop({ required: true })
  pricePerSemester!: number;
}

export const RoomSchema = SchemaFactory.createForClass(Room);