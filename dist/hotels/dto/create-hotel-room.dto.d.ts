import { RoomType, BedSize } from '../schemas/hotel-room.schema';
export declare class CreateRoomAmenitiesDto {
    hasBalcony?: boolean;
    hasHotWater?: boolean;
    hasTV?: boolean;
    hasDSTV?: boolean;
    hasTableChair?: boolean;
}
export declare class CreateHotelRoomDto {
    photo?: string;
    roomType: RoomType;
    isSelfContained?: boolean;
    floor: number;
    amenities?: CreateRoomAmenitiesDto;
    bedSize: BedSize;
    costPerNight: number;
    breakfastIncluded?: boolean;
    totalRooms: number;
    bookedRooms?: number;
}
export declare class UpdateHotelRoomDto extends CreateHotelRoomDto {
}
export declare class UpdateRoomInventoryDto {
    bookedRooms: number;
}
//# sourceMappingURL=create-hotel-room.dto.d.ts.map