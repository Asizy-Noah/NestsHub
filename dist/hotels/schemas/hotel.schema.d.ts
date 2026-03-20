import { Document, Types } from 'mongoose';
export declare enum ConnectivityType {
    FREE = "free",
    EXTRA_CHARGE = "extra_charge",
    NONE = "none"
}
export declare enum PaymentMethod {
    CASH = "cash",
    MOBILE_MONEY = "mobile_money",
    VISA = "visa"
}
export declare enum VerificationStatus {
    UNVERIFIED = "unverified",
    PENDING = "pending",
    VERIFIED = "verified",
    REJECTED = "rejected"
}
export declare class HotelAmenities extends Document {
    gym: boolean;
    bar: boolean;
    restaurant: boolean;
    parkingSpace: boolean;
    storageBuilding: boolean;
    supermarketNearby: boolean;
}
export declare class Hotel extends Document {
    managerId: Types.ObjectId;
    name: string;
    description: string;
    telephone: string;
    email: string;
    whatsapp: string;
    district: string;
    townOrCity: string;
    street: string;
    distanceToMainRoad: string;
    coverPhoto: string;
    gallery: string[];
    amenities: HotelAmenities;
    wifiStatus: ConnectivityType;
    paymentMethods: PaymentMethod[];
    verificationStatus: VerificationStatus;
    verificationAppliedAt: Date;
    verificationApprovedAt: Date;
    verificationRejectionReason: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const HotelSchema: import("mongoose").Schema<Hotel, import("mongoose").Model<Hotel, any, any, any, Document<unknown, any, Hotel, any, {}> & Hotel & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Hotel, Document<unknown, {}, import("mongoose").FlatRecord<Hotel>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Hotel> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
//# sourceMappingURL=hotel.schema.d.ts.map