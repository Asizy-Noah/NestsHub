import mongoose, { Document } from 'mongoose';
export declare class Room extends Document {
    hostelId: mongoose.Schema.Types.ObjectId;
    totalRooms: number;
    availableRooms: number;
    photos: string[];
    type: string;
    isSelfContained: boolean;
    floorLevel: number;
    cooking: {
        allowed: boolean;
        method: string;
    };
    pricePerSemester: number;
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