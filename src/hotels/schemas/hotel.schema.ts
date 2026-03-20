import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum ConnectivityType {
  FREE = 'free',
  EXTRA_CHARGE = 'extra_charge',
  NONE = 'none',
}

export enum PaymentMethod {
  CASH = 'cash',
  MOBILE_MONEY = 'mobile_money',
  VISA = 'visa',
}

export enum VerificationStatus {
  UNVERIFIED = 'unverified',
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

@Schema({ timestamps: true })
export class HotelAmenities extends Document {
  @Prop({ default: false })
  gym!: boolean;

  @Prop({ default: false })
  bar!: boolean;

  @Prop({ default: false })
  restaurant!: boolean;

  @Prop({ default: false })
  parkingSpace!: boolean;

  @Prop({ default: false })
  storageBuilding!: boolean;

  @Prop({ default: false })
  supermarketNearby!: boolean;
}

const HotelAmenitiesSchema = SchemaFactory.createForClass(HotelAmenities);

@Schema({ timestamps: true })
export class Hotel extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Account', required: true })
  managerId!: Types.ObjectId;

  @Prop({ required: true })
  name!: string;

  @Prop()
  description!: string;

  @Prop()
  telephone!: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop()
  whatsapp!: string;

  // Location details
  @Prop({ required: true })
  district!: string;

  @Prop({ required: true })
  townOrCity!: string;

  @Prop()
  street!: string;

  @Prop({ 
    type: String, 
    enum: ['on_the_road', 'less_500m', '500m_1km', '1km_5km', '5km_plus'],
    default: '1km_5km'
  })
  distanceToMainRoad!: string;

  // Media
  @Prop()
  coverPhoto!: string;

  @Prop({ type: [String], default: [] })
  gallery!: string[];

  // Amenities and Services
  @Prop({ type: HotelAmenitiesSchema })
  amenities!: HotelAmenities;

  @Prop({ 
    type: String, 
    enum: Object.values(ConnectivityType), 
    default: ConnectivityType.NONE 
  })
  wifiStatus!: ConnectivityType;

  @Prop({ 
    type: [String], 
    enum: Object.values(PaymentMethod),
    default: [PaymentMethod.CASH]
  })
  paymentMethods!: PaymentMethod[];

  // Verification
  @Prop({ 
    type: String, 
    enum: Object.values(VerificationStatus), 
    default: VerificationStatus.UNVERIFIED 
  })
  verificationStatus!: VerificationStatus;

  @Prop()
  verificationAppliedAt!: Date;

  @Prop()
  verificationApprovedAt!: Date;

  @Prop()
  verificationRejectionReason!: string;

  @Prop({ default: true })
  isActive!: boolean;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);

// Indexes
HotelSchema.index({ managerId: 1 });
HotelSchema.index({ email: 1 });
HotelSchema.index({ district: 1 });
HotelSchema.index({ townOrCity: 1 });
HotelSchema.index({ verificationStatus: 1 });
HotelSchema.index({ createdAt: -1 });
