import { HouseType, BuildingStyle, AccessRoadType, BillingPayer } from '../schemas/rental-property.schema';
export declare class CreateRentalDto {
    propertyName: string;
    description: string;
    houseType: HouseType;
    buildingStyle: BuildingStyle;
    unitCount: number;
    monthlyRent: number;
    isSelfContained: boolean;
    isFenced: boolean;
    isCompoundPaved: boolean;
    hasAmpleParking: boolean;
    hasOutsideWashrooms: boolean;
    hasSecurity: boolean;
    hasWater: boolean;
    isFurnished: boolean;
    furnitureList: string[];
    waterBillPaidBy: BillingPayer;
    electricityBillPaidBy: BillingPayer;
    securityFeePaidBy: BillingPayer;
    nearestTown: string;
    nearestCity: string;
    nearestRoad: string;
    accessRoadType: AccessRoadType;
    distanceToTarmac: number;
    distanceToGym: string;
    distanceToSupermarket: string;
    distanceToGroceries: string;
    shoppingCenterName: string;
    contactPerson: string;
    telephone: string;
    whatsapp: string;
    email: string;
}
export declare class UpdateRentalDto extends CreateRentalDto {
    coverPhoto: string;
    gallery: string[];
}
//# sourceMappingURL=create-rental.dto.d.ts.map