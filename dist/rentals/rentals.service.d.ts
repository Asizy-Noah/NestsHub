import { Model } from 'mongoose';
import { RentalProperty } from './schemas/rental-property.schema';
import { RentalProfile } from './schemas/rental-profile.schema';
export declare class RentalsService {
    private rentalModel;
    private profileModel;
    constructor(rentalModel: Model<RentalProperty>, profileModel: Model<RentalProfile>);
    getDashboardData(managerId: string): Promise<{
        rentals: (import("mongoose").Document<unknown, {}, RentalProperty, {}, {}> & RentalProperty & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    getProfile(managerId: string): Promise<import("mongoose").Document<unknown, {}, RentalProfile, {}, {}> & RentalProfile & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateProfile(managerId: string, data: any): Promise<import("mongoose").Document<unknown, {}, RentalProfile, {}, {}> & RentalProfile & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    addRental(managerId: string, data: any): Promise<import("mongoose").Document<unknown, {}, RentalProperty, {}, {}> & RentalProperty & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateRental(rentalId: string, managerId: string, data: any): Promise<import("mongoose").Document<unknown, {}, RentalProperty, {}, {}> & RentalProperty & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    deleteRental(rentalId: string, managerId: string): Promise<{
        success: boolean;
    }>;
    updateUnitQuantity(rentalId: string, managerId: string, change: number): Promise<import("mongoose").Document<unknown, {}, RentalProperty, {}, {}> & RentalProperty & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
//# sourceMappingURL=rentals.service.d.ts.map