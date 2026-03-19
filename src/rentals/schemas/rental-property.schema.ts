import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum HouseType {
  STUDIO = 'studio',
  ONE_BEDROOM = '1-bedroom',
  TWO_BEDROOM = '2-bedroom',
  THREE_BEDROOM = '3-bedroom',
  FOUR_BEDROOM = '4-bedroom',
}

export enum BuildingStyle {
  FLAT_STOREY = 'flat_storey',
  SINGLE_LEVEL = 'single_level',
}

export enum AccessRoadType {
  TARMAC = 'tarmac',
  MURRAM_GRAVEL = 'murram_gravel',
}

export enum BillingPayer {
  TENANT = 'tenant',
  LANDLORD = 'landlord',
}

export enum VerificationStatus {
  UNVERIFIED = 'unverified',
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

@Schema({ timestamps: true })
export class RentalProperty extends Document {
  // Manager Information
  @Prop({ type: Types.ObjectId, ref: 'Account', required: true })
  managerId: Types.ObjectId;

  // Basic Property Information
  @Prop({ required: true })
  propertyName: string;

  @Prop()
  description: string;

  @Prop({
    type: String,
    enum: Object.values(HouseType),
    required: true,
  })
  houseType: HouseType;

  @Prop({
    type: String,
    enum: Object.values(BuildingStyle),
    required: true,
  })
  buildingStyle: BuildingStyle;

  @Prop({ required: true, min: 1 })
  unitCount: number;

  @Prop()
  monthlyRent: number;

  // Property Features
  @Prop({ default: false })
  isSelfContained: boolean;

  @Prop({ default: false })
  isFenced: boolean;

  @Prop({ default: false })
  isCompoundPaved: boolean;

  @Prop({ default: false })
  hasAmpleParking: boolean;

  @Prop({ default: false })
  hasOutsideWashrooms: boolean;

  @Prop({ default: false })
  hasSecurity: boolean;

  @Prop({ default: false })
  hasWater: boolean;

  // Furnishing Details
  @Prop({ default: false })
  isFurnished: boolean;

  @Prop({ type: [String], default: [] })
  furnitureList: string[];

  // Billing Logic
  @Prop({
    type: String,
    enum: Object.values(BillingPayer),
    default: BillingPayer.TENANT,
  })
  waterBillPaidBy: BillingPayer;

  @Prop({
    type: String,
    enum: Object.values(BillingPayer),
    default: BillingPayer.TENANT,
  })
  electricityBillPaidBy: BillingPayer;

  @Prop({
    type: String,
    enum: Object.values(BillingPayer),
    default: BillingPayer.LANDLORD,
  })
  securityFeePaidBy: BillingPayer;

  // Location & Access
  @Prop({ required: true })
  nearestTown: string;

  @Prop({ required: true })
  nearestCity: string;

  @Prop()
  nearestRoad: string;

  @Prop({
    type: String,
    enum: Object.values(AccessRoadType),
    required: true,
  })
  accessRoadType: AccessRoadType;

  @Prop()
  distanceToTarmac: number;

  // Proximity to Points of Interest
  @Prop()
  distanceToGym: string;

  @Prop()
  distanceToSupermarket: string;

  @Prop()
  distanceToGroceries: string;

  @Prop()
  shoppingCenterName: string;

  // Media
  @Prop()
  coverPhoto: string;

  @Prop({ type: [String], default: [] })
  gallery: string[];

  // Contact Information
  @Prop()
  contactPerson: string;

  @Prop()
  telephone: string;

  @Prop()
  whatsapp: string;

  @Prop()
  email: string;

  // Verification
  @Prop({
    type: String,
    enum: Object.values(VerificationStatus),
    default: VerificationStatus.UNVERIFIED,
  })
  verificationStatus: VerificationStatus;

  @Prop()
  verificationAppliedAt: Date;

  @Prop()
  verificationApprovedAt: Date;

  @Prop()
  verificationRejectionReason: string;

  @Prop()
  verificationProofUrl: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const RentalPropertySchema = SchemaFactory.createForClass(RentalProperty);

// Indexes for optimized queries
RentalPropertySchema.index({ managerId: 1 });
RentalPropertySchema.index({ houseType: 1 });
RentalPropertySchema.index({ nearestCity: 1 });
RentalPropertySchema.index({ nearestTown: 1 });
RentalPropertySchema.index({ verificationStatus: 1 });
RentalPropertySchema.index({ createdAt: -1 });
RentalPropertySchema.index({ isActive: 1 });
