import mongoose, { Document } from 'mongoose';
export declare class Hostel extends Document {
    managerId: mongoose.Types.ObjectId;
    name: string;
    phones: string[];
    whatsapps: string[];
    emails: string[];
    profilePhoto: string;
    gallery: string[];
    locationType: string;
    locationName: string;
    distance: number;
    popularAreaName: string;
    amenities: {
        security: boolean;
        tvRoom: boolean;
        readingRoom: boolean;
        gym: boolean;
        swimmingPool: boolean;
        parking: boolean;
        freeInternet: boolean;
        paidInternet: boolean;
        freeTransport: boolean;
        lifts: boolean;
        cookingSpaces: boolean;
        restaurant: boolean;
        prayerRoom: boolean;
        superMarket: boolean;
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