import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document} from 'mongoose';

@Schema({ timestamps: true, autoIndex: true })
export class Hotel extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true })
  managerId!: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true }) name!: string;
  
  @Prop({ type: [String], default: [] }) phones!: string[];
  @Prop({ type: [String], default: [] }) whatsapps!: string[];
  @Prop({ type: [String], default: [] }) emails!: string[];
  
  @Prop() profilePhoto!: string;
  @Prop({ type: [String], default: [] }) gallery!: string[];

  // UPDATED: Hotel Specific Location
  @Prop() districtOrCity!: string;
  @Prop() division!: string;
  @Prop() nearestTown!: string;
  @Prop() distanceFromTown!: number;
  @Prop() popularAreaName!: string;
  @Prop() street!: string;
  @Prop() address!: string;
  @Prop({ default: false }) accessTarmacked!: boolean;

  // UPDATED: Hotel Specific Amenities
  @Prop({ type: Object, default: {} })
  amenities!: { 
    security: boolean; gym: boolean; swimmingPool: boolean; parking: boolean; 
    freeInternet: boolean; restaurant: boolean; prayerRoom: boolean; bar: boolean; 
    massage: boolean; sauna: boolean; salon: boolean; dstv: boolean; cottages: boolean;
    gardens: boolean; greenery: boolean; // Added fields
  };

  @Prop({ default: false }) isVerified!: boolean;
  @Prop({ default: 'Draft' }) verificationStatus!: string;
}
export const HotelSchema = SchemaFactory.createForClass(Hotel);
HotelSchema.index({ name: 1, districtOrCity: 1, division: 1 }, { unique: true });