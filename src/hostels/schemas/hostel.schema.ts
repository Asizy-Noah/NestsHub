import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Hostel extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true })
  managerId!: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name!: string;

  @Prop() tel!: string;
  @Prop() email!: string;
  @Prop() whatsapp!: string;
  
  @Prop() coverImage!: string;
  @Prop([String]) utilityGallery!: string[];

  @Prop({ type: String, enum: ['University', 'Town'], default: 'University' })
  locationType!: string;

  @Prop() distance!: number; // e.g., 500 meters from campus

  @Prop({ type: Object, default: { market: false, hospital: false, pharmacy: false, clinic: false } })
  proximity!: { market: boolean; hospital: boolean; pharmacy: boolean; clinic: boolean };

  @Prop({ type: Object, default: { security: false, tvRoom: false, readingRoom: false, gym: false, swimmingPool: false, parking: false } })
  amenities!: { security: boolean; tvRoom: boolean; readingRoom: boolean; gym: boolean; swimmingPool: boolean; parking: boolean };

  @Prop({ type: Object, default: { catering: 'None', internet: 'None' } })
  services!: { catering: string; internet: string }; // e.g., 'Included', 'Additional Fee', 'Free', 'Paid'

  @Prop({ default: false })
  isVerified!: boolean;

  @Prop({ default: 'Draft' })
  verificationStatus!: string; // Draft, Pending, Verified
}

export const HostelSchema = SchemaFactory.createForClass(Hostel);