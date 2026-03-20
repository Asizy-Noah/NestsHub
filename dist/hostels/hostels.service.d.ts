import { Model } from 'mongoose';
import { Hostel } from './schemas/hostel.schema';
import { Room } from './schemas/room.schema';
import { Account } from '../accounts/schemas/account.schema';
import { EmailService } from '../auth/email.service';
export declare class HostelsService {
    private hostelModel;
    private roomModel;
    private accountModel;
    private emailService;
    private readonly logger;
    constructor(hostelModel: Model<Hostel>, roomModel: Model<Room>, accountModel: Model<Account>, emailService: EmailService);
    getHostelDataByManager(managerId: string): Promise<{
        hostel: import("mongoose").Document<unknown, {}, Hostel, {}, {}> & Hostel & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
        rooms: (import("mongoose").Document<unknown, {}, Room, {}, {}> & Room & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    updateHostel(managerId: string, data: any): Promise<import("mongoose").Document<unknown, {}, Hostel, {}, {}> & Hostel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    addRoom(managerId: string, roomData: any): Promise<import("mongoose").Document<unknown, {}, Room, {}, {}> & Room & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateRoom(roomId: string, managerId: string, roomData: any): Promise<import("mongoose").Document<unknown, {}, Room, {}, {}> & Room & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateRoomQuantity(roomId: string, managerId: string, change: number): Promise<import("mongoose").Document<unknown, {}, Room, {}, {}> & Room & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    deleteRoom(roomId: string, managerId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    applyVerification(managerId: string): Promise<{
        message: string;
        status: string;
    }>;
}
//# sourceMappingURL=hostels.service.d.ts.map