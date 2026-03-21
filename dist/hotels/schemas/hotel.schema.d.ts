import mongoose, { Document } from 'mongoose';
export declare class Hotel extends Document {
    managerId: mongoose.Schema.Types.ObjectId;
    name: string;
    phones: string[];
    whatsapps: string[];
    emails: string[];
    profilePhoto: string;
    gallery: string[];
    districtOrCity: string;
    division: string;
    nearestTown: string;
    distanceFromTown: number;
    popularAreaName: string;
    street: string;
    address: string;
    accessTarmacked: boolean;
    amenities: {
        security: boolean;
        gym: boolean;
        swimmingPool: boolean;
        parking: boolean;
        freeInternet: boolean;
        restaurant: boolean;
        prayerRoom: boolean;
        bar: boolean;
        massage: boolean;
        sauna: boolean;
        salon: boolean;
        dstv: boolean;
        cottages: boolean;
        gardens: boolean;
        greenery: boolean;
    };
    isVerified: boolean;
    verificationStatus: string;
}
export declare const HotelSchema: mongoose.Schema<Hotel, mongoose.Model<Hotel, any, any, any, mongoose.Document<unknown, any, Hotel, any, {}> & Hotel & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Hotel, mongoose.Document<unknown, {}, mongoose.FlatRecord<Hotel>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<Hotel> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
//# sourceMappingURL=hotel.schema.d.ts.map