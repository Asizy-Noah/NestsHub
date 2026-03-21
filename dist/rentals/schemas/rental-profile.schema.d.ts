import mongoose, { Document } from 'mongoose';
export declare class RentalProfile extends Document {
    managerId: mongoose.Schema.Types.ObjectId;
    role: string;
    firstName: string;
    lastName: string;
    username: string;
    photo: string;
    phones: string[];
    whatsapps: string[];
    emails: string[];
    areasOfOperation: string[];
}
export declare const RentalProfileSchema: mongoose.Schema<RentalProfile, mongoose.Model<RentalProfile, any, any, any, mongoose.Document<unknown, any, RentalProfile, any, {}> & RentalProfile & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, RentalProfile, mongoose.Document<unknown, {}, mongoose.FlatRecord<RentalProfile>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<RentalProfile> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
//# sourceMappingURL=rental-profile.schema.d.ts.map