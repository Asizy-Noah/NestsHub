import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum LocationType {
  UNIVERSITY = 'university',
  TOWN = 'town',
}

export enum InternetType {
  FREE = 'free',
  PAID = 'paid',
  NONE = 'none',
}

export enum CateringType {
  INCLUDED = 'included',
  ADDITIONAL_FEE = 'additional_fee',
  NONE = 'none',
}

export enum VerificationStatus {
  UNVERIFIED = 'unverified',
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

@Schema({ timestamps: true })
export class Amenities extends Document {
  @Prop({ default: false })
  security: boolean;

  @Prop({ default: false })
  tvRoom: boolean;

  @Prop({ default: false })
  readingRoom: boolean;

  @Prop({ default: false })
  gym: boolean;

  @Prop({ default: false })
  swimmingPool: boolean;

  @Prop({ default: false })
  parking: boolean;

  @Prop({ default: false })
  wifi: boolean;

  @Prop({ default: false })
  laundry: boolean;

  @Prop({ default: false })
  generator: boolean;
}

const AmenitiesSchema = SchemaFactory.createForClass(Amenities);

@Schema({ timestamps: true })
export class Services extends Document {
  @Prop({ type: String, enum: Object.values(InternetType), default: InternetType.NONE })
  internet: InternetType;

  @Prop({ type: String, enum: Object.values(CateringType), default: CateringType.NONE })
  catering: CateringType;

  @Prop()
  distanceToMarket: number; // in kilometers

  @Prop()
  distanceToHospital: number;

  @Prop()
  distanceToPharmacy: number;

  @Prop()
  distanceToClinic: number;
}

const ServicesSchema = SchemaFactory.createForClass(Services);

@Schema({ timestamps: true })
export class Hostel extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Account', required: true })
  managerId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  telephone: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop()
  whatsapp: string;

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  country: string;

  @Prop({ type: String, enum: Object.values(LocationType), required: true })
  locationType: LocationType;

  @Prop()
  distance: number; // Distance from University/Town center in km

  @Prop({ type: AmenitiesSchema })
  amenities: Amenities;

  @Prop({ type: ServicesSchema })
  services: Services;

  @Prop()
  coverImage: string;

  @Prop({ type: [String], default: [] })
  utilityImages: string[];

  @Prop({ type: String, enum: Object.values(VerificationStatus), default: VerificationStatus.UNVERIFIED })
  verificationStatus: VerificationStatus;

  @Prop()
  verificationAppliedAt: Date;

  @Prop()
  verificationApprovedAt: Date;

  @Prop()
  verificationRejectionReason: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const HostelSchema = SchemaFactory.createForClass(Hostel);

// Indexes
HostelSchema.index({ managerId: 1 });
HostelSchema.index({ email: 1 });
HostelSchema.index({ city: 1 });
HostelSchema.index({ verificationStatus: 1 });
HostelSchema.index({ createdAt: -1 });
