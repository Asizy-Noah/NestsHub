import { ConnectivityType, PaymentMethod } from '../schemas/hotel.schema';
export declare class CreateHotelAmenitiesDto {
    gym?: boolean;
    bar?: boolean;
    restaurant?: boolean;
    parkingSpace?: boolean;
    storageBuilding?: boolean;
    supermarketNearby?: boolean;
}
export declare class CreateHotelDto {
    name: string;
    description?: string;
    telephone?: string;
    email: string;
    whatsapp?: string;
    district: string;
    townOrCity: string;
    street?: string;
    distanceToMainRoad?: string;
    coverPhoto?: string;
    gallery?: string[];
    amenities?: CreateHotelAmenitiesDto;
    wifiStatus?: ConnectivityType;
    paymentMethods?: PaymentMethod[];
}
export declare class UpdateHotelDto extends CreateHotelDto {
}
//# sourceMappingURL=create-hotel.dto.d.ts.map