import { LocationType, InternetType, CateringType } from '../schemas/hostel.schema';
export declare class AmenitiesDto {
    security?: boolean;
    tvRoom?: boolean;
    readingRoom?: boolean;
    gym?: boolean;
    swimmingPool?: boolean;
    parking?: boolean;
    wifi?: boolean;
    laundry?: boolean;
    generator?: boolean;
}
export declare class ServicesDto {
    internet?: InternetType;
    catering?: CateringType;
    distanceToMarket?: number;
    distanceToHospital?: number;
    distanceToPharmacy?: number;
    distanceToClinic?: number;
}
export declare class CreateHostelDto {
    name: string;
    description?: string;
    telephone?: string;
    email: string;
    whatsapp?: string;
    address?: string;
    city?: string;
    country?: string;
    locationType: LocationType;
    distance?: number;
    amenities?: AmenitiesDto;
    services?: ServicesDto;
    coverImage?: string;
    utilityImages?: string[];
}
export declare class UpdateHostelDto {
    name?: string;
    description?: string;
    telephone?: string;
    email?: string;
    whatsapp?: string;
    address?: string;
    city?: string;
    country?: string;
    locationType?: LocationType;
    distance?: number;
    amenities?: AmenitiesDto;
    services?: ServicesDto;
    coverImage?: string;
    utilityImages?: string[];
    isActive?: boolean;
}
export declare class ApplyVerificationDto {
    additionalInfo?: string;
}
//# sourceMappingURL=create-hostel.dto.d.ts.map