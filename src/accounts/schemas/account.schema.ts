import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum AccountRole {
  INDIVIDUAL = 'individual',
  HOSTEL_MANAGER = 'hostel_manager',
  HOTEL_MANAGER = 'hotel_manager',
  PROPERTY_MANAGER = 'property_manager',
  ADMIN = 'admin',
  STAFF = 'staff',
}

export enum AccountStatus {
  PENDING_EMAIL_VERIFICATION = 'pending_email_verification',
  EMAIL_VERIFIED = 'email_verified',
  PENDING_PASSWORD_SET = 'pending_password_set',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  DELETED = 'deleted',
}

@Schema({ timestamps: true, discriminatorKey: 'role' })
export class Account extends Document {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ required: true })
  firstName!: string;

  @Prop({ required: true })
  lastName!: string;

  @Prop({ type: String, enum: Object.values(AccountRole), required: true })
  role!: AccountRole;

  @Prop({ type: String, enum: Object.values(AccountStatus), default: AccountStatus.PENDING_EMAIL_VERIFICATION })
  status!: AccountStatus;

  @Prop() // Add this line
  password?: string;

  @Prop({ type: String, default: null }) 
  emailVerificationToken!: string | null;

  @Prop()
  emailVerificationExpiry!: Date;

  @Prop({ default: false })
  emailVerified!: boolean;

  @Prop()
  passwordResetToken!: string;

  @Prop()
  passwordResetExpiry!: Date;

  @Prop({ default: false })
  twoFactorEnabled!: boolean;

  @Prop()
  twoFactorSecret!: string;

  @Prop()
  phoneNumber!: string;

  @Prop()
  profilePicture!: string;

  @Prop({ default: false })
  deleted!: boolean;

  @Prop()
  deletedAt!: Date;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;

  // Hostel-specific fields
  @Prop()
  hostelName!: string;

  @Prop()
  hostelAddress!: string;

  @Prop()
  hostelCity!: string;

  @Prop()
  hostelCountry!: string;

  @Prop()
  hostelPhoneNumber!: string;

  @Prop()
  hostelRegistrationNumber!: string;

  // Hotel-specific fields
  @Prop()
  hotelName!: string;

  @Prop()
  hotelAddress!: string;

  @Prop()
  hotelCity!: string;

  @Prop()
  hotelCountry!: string;

  @Prop()
  hotelPhoneNumber!: string;

  @Prop()
  hotelRegistrationNumber!: string;

  @Prop()
  hotelStarRating!: number;

  @Prop()
  otherNames!: string;

  @Prop()
  nationality!: string;

  @Prop()
  idNumber!: string;

  @Prop({ default: '' }) photo?: string;
  @Prop({ type: [String], default: [] }) phones?: string[];
  @Prop({ type: [String], default: [] }) whatsapps?: string[];
}

export const AccountSchema = SchemaFactory.createForClass(Account);

// Indexes for better query performance
AccountSchema.index({ role: 1 });
AccountSchema.index({ status: 1 });
AccountSchema.index({ createdAt: -1 });
AccountSchema.index({ emailVerificationToken: 1 });
AccountSchema.index({ passwordResetToken: 1 });
