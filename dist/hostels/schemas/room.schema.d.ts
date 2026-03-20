import { Document, Types } from 'mongoose';
export declare enum RoomType {
    SINGLE = "single",
    DOUBLE = "double",
    TRIPLE = "triple",
    DORMITORY = "dormitory"
}
export declare enum CookingPolicy {
    ELECTRICITY = "electricity",
    CHARCOAL = "charcoal",
    GAS = "gas",
    NOT_ALLOWED = "not_allowed"
}
export declare class Room extends Document {
    hostelId: Types.ObjectId;
    type: RoomType;
    roomNumber: string;
    floor: number;
    isSelfContained: boolean;
    cookingPolicy: CookingPolicy;
    images: string[];
    pricePerMonth: number;
    capacity: number;
    isAvailable: boolean;
    description: string;
    amenities: string[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const RoomSchema: import("mongoose").Schema<Room, import("mongoose").Model<Room, any, any, any, Document<unknown, any, Room, any, {}> & Room & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Room, Document<unknown, {}, import("mongoose").FlatRecord<Room>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Room> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
//# sourceMappingURL=room.schema.d.ts.map