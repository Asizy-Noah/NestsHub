import { HotelsService } from './hotels.service';
export declare class HotelsController {
    private readonly hotelsService;
    constructor(hotelsService: HotelsService);
    getDashboard(req: any): Promise<{
        title: string;
        layout: string;
        manager: any;
        hotelData: string;
    }>;
    updateHotel(req: any, data: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/hotel.schema").Hotel, {}, {}> & import("./schemas/hotel.schema").Hotel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    applyForVerification(req: any): Promise<{
        status: string;
    }>;
    addRoom(req: any, roomData: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/hotel-room.schema").HotelRoom, {}, {}> & import("./schemas/hotel-room.schema").HotelRoom & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateRoom(req: any, roomId: string, roomData: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/hotel-room.schema").HotelRoom, {}, {}> & import("./schemas/hotel-room.schema").HotelRoom & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    deleteRoom(req: any, roomId: string): Promise<{
        success: boolean;
    }>;
    updateRoomQuantity(req: any, roomId: string, change: number): Promise<import("mongoose").Document<unknown, {}, import("./schemas/hotel-room.schema").HotelRoom, {}, {}> & import("./schemas/hotel-room.schema").HotelRoom & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getProfileView(req: any): Promise<{
        title: string;
        layout: string;
        manager: any;
        account: string;
    }>;
    getReviewsView(req: any): {
        title: string;
        layout: string;
        manager: any;
    };
}
//# sourceMappingURL=hotels.controller.d.ts.map