import { RoomType, CookingPolicy } from '../schemas/room.schema';
export declare class CreateRoomDto {
    roomNumber: string;
    type: RoomType;
    floor: number;
    isSelfContained?: boolean;
    cookingPolicy?: CookingPolicy;
    images?: string[];
    pricePerMonth?: number;
    capacity?: number;
    isAvailable?: boolean;
    description?: string;
    amenities?: string[];
}
export declare class UpdateRoomDto {
    roomNumber?: string;
    type?: RoomType;
    floor?: number;
    isSelfContained?: boolean;
    cookingPolicy?: CookingPolicy;
    images?: string[];
    pricePerMonth?: number;
    capacity?: number;
    isAvailable?: boolean;
    description?: string;
    amenities?: string[];
}
//# sourceMappingURL=create-room.dto.d.ts.map