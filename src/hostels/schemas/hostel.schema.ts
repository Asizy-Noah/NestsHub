import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true, autoIndex: true })
export class Hostel extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true })
  managerId!: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true }) name!: string;
  
  // Multiple Contacts
  @Prop({ type: [String], default: [] }) phones!: string[];
  @Prop({ type: [String], default: [] }) whatsapps!: string[];
  @Prop({ type: [String], default: [] }) emails!: string[];
  
  // Media
  @Prop() profilePhoto!: string;
  @Prop({ type: [String], default: [] }) gallery!: string[]; // Up to 5 photos

  // Location
  @Prop({ type: String, enum: ['University', 'Town'], default: 'University' }) locationType!: string;
  @Prop() locationName!: string; // Name of Univ or Town
  @Prop() distance!: number;
  @Prop() popularAreaName!: string; // e.g., "Kikoni"

  // Expanded Amenities (Booleans)
  @Prop({ type: Object, default: {} })
  amenities!: { 
    security: boolean; tvRoom: boolean; readingRoom: boolean; gym: boolean; swimmingPool: boolean; parking: boolean;
    freeInternet: boolean; paidInternet: boolean; freeTransport: boolean; lifts: boolean; cookingSpaces: boolean;
    restaurant: boolean; prayerRoom: boolean; superMarket: boolean;
  };

  @Prop({ default: false }) isVerified!: boolean;
  @Prop({ default: 'Draft' }) verificationStatus!: string;
}
export const HostelSchema = SchemaFactory.createForClass(Hostel);
HostelSchema.index({ name: 1, locationType: 1, popularAreaName: 1 }, { unique: true });