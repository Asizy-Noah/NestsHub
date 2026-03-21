import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class RentalProfile extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true })
  managerId!: mongoose.Schema.Types.ObjectId;

  @Prop({ default: 'Property Manager' }) role!: string;
  @Prop({ default: '' }) firstName!: string;
  @Prop({ default: '' }) lastName!: string;
  @Prop({ default: '' }) username!: string;
  @Prop({ default: '' }) photo!: string;

  @Prop({ type: [String], default: [] }) phones!: string[];
  @Prop({ type: [String], default: [] }) whatsapps!: string[];
  @Prop({ type: [String], default: [] }) emails!: string[];
  @Prop({ type: [String], default: ['Kampala'] }) areasOfOperation!: string[];
}
export const RentalProfileSchema = SchemaFactory.createForClass(RentalProfile);