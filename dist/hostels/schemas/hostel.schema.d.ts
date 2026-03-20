import { Document, Types } from 'mongoose';
export declare enum LocationType {
    UNIVERSITY = "university",
    TOWN = "town"
}
export declare enum InternetType {
    FREE = "free",
    PAID = "paid",
    NONE = "none"
}
export declare enum CateringType {
    INCLUDED = "included",
    ADDITIONAL_FEE = "additional_fee",
    NONE = "none"
}
export declare enum VerificationStatus {
    UNVERIFIED = "unverified",
    PENDING = "pending",
    VERIFIED = "verified",
    REJECTED = "rejected"
}
export declare class Amenities extends Document {
    security: boolean;
    tvRoom: boolean;
    readingRoom: boolean;
    gym: boolean;
    swimmingPool: boolean;
    parking: boolean;
    wifi: boolean;
    laundry: boolean;
    generator: boolean;
}
export declare class Services extends Document {
    internet: InternetType;
    catering: CateringType;
    distanceToMarket: number;
    distanceToHospital: number;
    distanceToPharmacy: number;
    distanceToClinic: number;
}
export declare class Hostel extends Document {
    managerId: Types.ObjectId;
    name: string;
    description: string;
    telephone: string;
    email: string;
    whatsapp: string;
    address: string;
    city: string;
    country: string;
    locationType: LocationType;
    distance: number;
    amenities: Amenities;
    services: Services;
    coverImage: string;
    utilityImages: string[];
    verificationStatus: VerificationStatus;
    verificationAppliedAt: Date;
    verificationApprovedAt: Date;
    verificationRejectionReason: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const HostelSchema: import("mongoose").Schema<Hostel, import("mongoose").Model<Hostel, any, any, any, Document<unknown, any, Hostel, any, {}> & Hostel & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Hostel, Document<unknown, {}, import("mongoose").FlatRecord<Hostel>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Hostel> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
//# sourceMappingURL=hostel.schema.d.ts.map