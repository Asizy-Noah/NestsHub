import { Document, Types } from 'mongoose';
export declare enum RoomType {
    SINGLE = "single",
    DOUBLE = "double",
    SUITE = "suite"
}
export declare enum BedSize {
    THREE_BY_SIX = "3x6",
    FOUR_BY_SIX = "4x6",
    SIX_BY_SIX = "6x6"
}
export declare class RoomAmenities extends Document {
    hasBalcony: boolean;
    hasHotWater: boolean;
    hasTV: boolean;
    hasDSTV: boolean;
    hasTableChair: boolean;
}
export declare class HotelRoom extends Document {
    hotelId: Types.ObjectId;
    photo: string;
    roomType: RoomType;
    isSelfContained: boolean;
    floor: number;
    amenities: RoomAmenities;
    bedSize: BedSize;
    costPerNight: number;
    breakfastIncluded: boolean;
    totalRooms: number;
    bookedRooms: number;
    get availableRooms(): number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const HotelRoomSchema: import("mongoose").Schema<HotelRoom, import("mongoose").Model<HotelRoom, any, any, any, Document<unknown, any, HotelRoom, any, {}> & HotelRoom & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, HotelRoom, Document<unknown, {}, import("mongoose").FlatRecord<HotelRoom>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<HotelRoom> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
//# sourceMappingURL=hotel-room.schema.d.ts.map