import mongoose, { Document } from 'mongoose';
export declare class Room extends Document {
    managerId: mongoose.Types.ObjectId;
    hostelId: mongoose.Schema.Types.ObjectId;
    type: string;
    totalRooms: number;
    availableRooms: number;
    floorLevel: number;
    isSelfContained: boolean;
    hasBalcony: boolean;
    hasAC: boolean;
    isAccessible: boolean;
    price: number;
    pricingPeriod: string;
    cookingMethods: string[];
    isFurnished: boolean;
    furniture: string[];
    photos: string[];
}
export declare const RoomSchema: mongoose.Schema<Room, mongoose.Model<Room, any, any, any, mongoose.Document<unknown, any, Room, any, {}> & Room & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Room, mongoose.Document<unknown, {}, mongoose.FlatRecord<Room>, {}, mongoose.DefaultSchemaOptions> & mongoose.FlatRecord<Room> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
//# sourceMappingURL=room.schema.d.ts.map