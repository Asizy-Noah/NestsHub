import { Model } from 'mongoose';
import { Hotel } from './schemas/hotel.schema';
import { HotelRoom } from './schemas/hotel-room.schema';
import { Account } from '../accounts/schemas/account.schema';
import { EmailService } from '../auth/email.service';
export declare class HotelsService {
    private hotelModel;
    private roomModel;
    private accountModel;
    private emailService;
    private readonly logger;
    constructor(hotelModel: Model<Hotel>, roomModel: Model<HotelRoom>, accountModel: Model<Account>, emailService: EmailService);
    getHotelDataByManager(managerId: string): Promise<{
        hotel: import("mongoose").Document<unknown, {}, Hotel, {}, {}> & Hotel & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
        rooms: (import("mongoose").Document<unknown, {}, HotelRoom, {}, {}> & HotelRoom & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    updateHotel(managerId: string, data: any): Promise<import("mongoose").Document<unknown, {}, Hotel, {}, {}> & Hotel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    addRoom(managerId: string, roomData: any): Promise<import("mongoose").Document<unknown, {}, HotelRoom, {}, {}> & HotelRoom & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateRoom(roomId: string, managerId: string, roomData: any): Promise<import("mongoose").Document<unknown, {}, HotelRoom, {}, {}> & HotelRoom & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    deleteRoom(roomId: string, managerId: string): Promise<{
        success: boolean;
    }>;
    updateRoomQuantity(roomId: string, managerId: string, change: number): Promise<import("mongoose").Document<unknown, {}, HotelRoom, {}, {}> & HotelRoom & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    applyVerification(managerId: string): Promise<{
        status: string;
    }>;
    getManagerAccount(managerId: string): Promise<(import("mongoose").Document<unknown, {}, Account, {}, {}> & Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
//# sourceMappingURL=hotels.service.d.ts.map