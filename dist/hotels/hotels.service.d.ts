import { Model } from 'mongoose';
import { Hotel } from './schemas/hotel.schema';
import { HotelRoom } from './schemas/hotel-room.schema';
import { CreateHotelDto, UpdateHotelDto } from './dto/create-hotel.dto';
import { CreateHotelRoomDto, UpdateHotelRoomDto, UpdateRoomInventoryDto } from './dto/create-hotel-room.dto';
export declare class HotelsService {
    private hotelModel;
    private roomModel;
    constructor(hotelModel: Model<Hotel>, roomModel: Model<HotelRoom>);
    createHotel(managerId: string, createHotelDto: CreateHotelDto): Promise<Hotel>;
    getHotelByManager(managerId: string): Promise<Hotel>;
    getHotelById(id: string): Promise<Hotel>;
    updateHotel(hotelId: string, managerId: string, updateHotelDto: UpdateHotelDto): Promise<Hotel>;
    updateHotelAmenities(hotelId: string, managerId: string, amenities: any): Promise<Hotel>;
    applyForVerification(hotelId: string, managerId: string): Promise<Hotel>;
    toggleHotelActive(hotelId: string, managerId: string, isActive: boolean): Promise<Hotel>;
    searchHotels(query: string, district?: string, townOrCity?: string, verified?: boolean): Promise<Hotel[]>;
    getVerifiedHotels(): Promise<Hotel[]>;
    getDashboardStats(managerId: string): Promise<any>;
    createRoom(hotelId: string, managerId: string, createRoomDto: CreateHotelRoomDto): Promise<HotelRoom>;
    getRoomById(id: string): Promise<HotelRoom>;
    getRoomsByHotel(hotelId: string): Promise<HotelRoom[]>;
    updateRoom(roomId: string, hotelId: string, managerId: string, updateRoomDto: UpdateHotelRoomDto): Promise<HotelRoom>;
    updateRoomInventory(roomId: string, hotelId: string, managerId: string, inventoryDto: UpdateRoomInventoryDto): Promise<HotelRoom>;
    deleteRoom(roomId: string, hotelId: string, managerId: string): Promise<void>;
    toggleRoomActive(roomId: string, hotelId: string, managerId: string, isActive: boolean): Promise<HotelRoom>;
}
//# sourceMappingURL=hotels.service.d.ts.map