import { HotelsService } from './hotels.service';
import { CreateHotelDto, UpdateHotelDto } from './dto/create-hotel.dto';
import { CreateHotelRoomDto, UpdateHotelRoomDto, UpdateRoomInventoryDto } from './dto/create-hotel-room.dto';
export declare class HotelsController {
    private readonly hotelsService;
    constructor(hotelsService: HotelsService);
    createHotel(req: any, createHotelDto: CreateHotelDto): Promise<import("./schemas/hotel.schema").Hotel>;
    getMyHotel(req: any): Promise<import("./schemas/hotel.schema").Hotel>;
    getHotelById(id: string): Promise<import("./schemas/hotel.schema").Hotel>;
    updateHotel(id: string, req: any, updateHotelDto: UpdateHotelDto): Promise<import("./schemas/hotel.schema").Hotel>;
    updateAmenities(id: string, req: any, amenities: any): Promise<import("./schemas/hotel.schema").Hotel>;
    applyForVerification(id: string, req: any): Promise<import("./schemas/hotel.schema").Hotel>;
    toggleActive(id: string, req: any, body: {
        isActive: boolean;
    }): Promise<import("./schemas/hotel.schema").Hotel>;
    searchHotels(query?: string, district?: string, townOrCity?: string, verified?: string): Promise<import("./schemas/hotel.schema").Hotel[]>;
    getVerifiedHotels(): Promise<import("./schemas/hotel.schema").Hotel[]>;
    getDashboardStats(req: any): Promise<any>;
    createRoom(hotelId: string, req: any, createRoomDto: CreateHotelRoomDto): Promise<import("./schemas/hotel-room.schema").HotelRoom>;
    getRoomsByHotel(hotelId: string): Promise<import("./schemas/hotel-room.schema").HotelRoom[]>;
    getRoomById(roomId: string): Promise<import("./schemas/hotel-room.schema").HotelRoom>;
    updateRoom(hotelId: string, roomId: string, req: any, updateRoomDto: UpdateHotelRoomDto): Promise<import("./schemas/hotel-room.schema").HotelRoom>;
    updateRoomInventory(hotelId: string, roomId: string, req: any, inventoryDto: UpdateRoomInventoryDto): Promise<import("./schemas/hotel-room.schema").HotelRoom>;
    deleteRoom(hotelId: string, roomId: string, req: any): Promise<void>;
    toggleRoomActive(hotelId: string, roomId: string, req: any, body: {
        isActive: boolean;
    }): Promise<import("./schemas/hotel-room.schema").HotelRoom>;
}
//# sourceMappingURL=hotels.controller.d.ts.map