import { Document } from 'mongoose';
export declare enum AccountRole {
    INDIVIDUAL = "individual",
    HOSTEL_MANAGER = "hostel_manager",
    HOTEL_MANAGER = "hotel_manager",
    PROPERTY_MANAGER = "property_manager",
    ADMIN = "admin",
    STAFF = "staff"
}
export declare enum AccountStatus {
    PENDING_EMAIL_VERIFICATION = "pending_email_verification",
    EMAIL_VERIFIED = "email_verified",
    PENDING_PASSWORD_SET = "pending_password_set",
    ACTIVE = "active",
    SUSPENDED = "suspended",
    DELETED = "deleted"
}
export declare class Account extends Document {
    email: string;
    firstName: string;
    lastName: string;
    role: AccountRole;
    status: AccountStatus;
    password?: string;
    emailVerificationToken: string | null;
    emailVerificationExpiry: Date;
    emailVerified: boolean;
    passwordResetToken: string;
    passwordResetExpiry: Date;
    twoFactorEnabled: boolean;
    twoFactorSecret: string;
    phoneNumber: string;
    profilePicture: string;
    deleted: boolean;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    hostelName: string;
    hostelAddress: string;
    hostelCity: string;
    hostelCountry: string;
    hostelPhoneNumber: string;
    hostelRegistrationNumber: string;
    hotelName: string;
    hotelAddress: string;
    hotelCity: string;
    hotelCountry: string;
    hotelPhoneNumber: string;
    hotelRegistrationNumber: string;
    hotelStarRating: number;
    otherNames: string;
    nationality: string;
    idNumber: string;
    photo?: string;
    phones?: string[];
    whatsapps?: string[];
}
export declare const AccountSchema: import("mongoose").Schema<Account, import("mongoose").Model<Account, any, any, any, Document<unknown, any, Account, any, {}> & Account & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Account, Document<unknown, {}, import("mongoose").FlatRecord<Account>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Account> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
//# sourceMappingURL=account.schema.d.ts.map