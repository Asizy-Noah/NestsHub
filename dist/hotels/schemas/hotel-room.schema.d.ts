import mongoose, { Document } from 'mongoose';
export declare class HotelRoom extends Document {
    managerId: mongoose.Types.ObjectId;
    hotelId: mongoose.Schema.Types.ObjectId;
    type: string;
    totalRooms: number;
    availableRooms: number;
    floorLevel: number;
    isSelfContained: boolean;
    hasBalcony: boolean;
    hasAC: boolean;
    isAccessible: boolean;
    bedAndBreakfast: boolean;
    workingTable: boolean;
    hotWater: boolean;
    hasTV: boolean;
    price: number;
    pricingPeriod: string;
    bedSize: string;
    photos: string[];
}
export declare const HotelRoomSchema: mongoose.Schema<HotelRoom, mongoose.Model<HotelRoom, any, any, any, mongoose.Document<unknown, any, HotelRoom, any, {}> & HotelRoom & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, HotelRoom, mongoose.Document<unknown, {}, mongoose.FlatRecord<HotelRoom>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<HotelRoom> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
//# sourceMappingURL=hotel-room.schema.d.ts.map