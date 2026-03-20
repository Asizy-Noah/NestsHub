import { Document, Types } from 'mongoose';
export declare enum HouseType {
    STUDIO = "studio",
    ONE_BEDROOM = "1-bedroom",
    TWO_BEDROOM = "2-bedroom",
    THREE_BEDROOM = "3-bedroom",
    FOUR_BEDROOM = "4-bedroom"
}
export declare enum BuildingStyle {
    FLAT_STOREY = "flat_storey",
    SINGLE_LEVEL = "single_level"
}
export declare enum AccessRoadType {
    TARMAC = "tarmac",
    MURRAM_GRAVEL = "murram_gravel"
}
export declare enum BillingPayer {
    TENANT = "tenant",
    LANDLORD = "landlord"
}
export declare enum VerificationStatus {
    UNVERIFIED = "unverified",
    PENDING = "pending",
    VERIFIED = "verified",
    REJECTED = "rejected"
}
export declare class RentalProperty extends Document {
    managerId: Types.ObjectId;
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
    coverPhoto: string;
    gallery: string[];
    contactPerson: string;
    telephone: string;
    whatsapp: string;
    email: string;
    verificationStatus: VerificationStatus;
    verificationAppliedAt: Date;
    verificationApprovedAt: Date;
    verificationRejectionReason: string;
    verificationProofUrl: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const RentalPropertySchema: import("mongoose").Schema<RentalProperty, import("mongoose").Model<RentalProperty, any, any, any, Document<unknown, any, RentalProperty, any, {}> & RentalProperty & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RentalProperty, Document<unknown, {}, import("mongoose").FlatRecord<RentalProperty>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<RentalProperty> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
//# sourceMappingURL=rental-property.schema.d.ts.map