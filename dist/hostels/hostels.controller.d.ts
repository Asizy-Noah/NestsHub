import { HostelsService } from './hostels.service';
export declare class HostelsController {
    private readonly hostelsService;
    constructor(hostelsService: HostelsService);
    getDashboard(req: any): Promise<{
        title: string;
        layout: string;
        manager: any;
        hostelData: string;
    }>;
    updateHostel(req: any, data: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/hostel.schema").Hostel, {}, {}> & import("./schemas/hostel.schema").Hostel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    applyForVerification(req: any): Promise<{
        message: string;
        status: string;
    }>;
    addRoom(req: any, roomData: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/room.schema").Room, {}, {}> & import("./schemas/room.schema").Room & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateRoomQuantity(req: any, roomId: string, change: number): Promise<import("mongoose").Document<unknown, {}, import("./schemas/room.schema").Room, {}, {}> & import("./schemas/room.schema").Room & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
//# sourceMappingURL=hostels.controller.d.ts.map