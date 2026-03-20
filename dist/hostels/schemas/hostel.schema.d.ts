import mongoose, { Document } from 'mongoose';
export declare class Hostel extends Document {
    managerId: mongoose.Schema.Types.ObjectId;
    name: string;
    tel: string;
    email: string;
    whatsapp: string;
    coverImage: string;
    utilityGallery: string[];
    locationType: string;
    distance: number;
    proximity: {
        market: boolean;
        hospital: boolean;
        pharmacy: boolean;
        clinic: boolean;
    };
    amenities: {
        security: boolean;
        tvRoom: boolean;
        readingRoom: boolean;
        gym: boolean;
        swimmingPool: boolean;
        parking: boolean;
    };
    services: {
        catering: string;
        internet: string;
    };
    isVerified: boolean;
    verificationStatus: string;
}
export declare const HostelSchema: mongoose.Schema<Hostel, mongoose.Model<Hostel, any, any, any, mongoose.Document<unknown, any, Hostel, any, {}> & Hostel & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Hostel, mongoose.Document<unknown, {}, mongoose.FlatRecord<Hostel>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<Hostel> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
//# sourceMappingURL=hostel.schema.d.ts.map