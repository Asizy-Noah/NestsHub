import { RentalsService } from './rentals.service';
export declare class RentalsController {
    private readonly rentalsService;
    constructor(rentalsService: RentalsService);
    getDashboard(req: any): Promise<{
        title: string;
        layout: string;
        manager: any;
        rentalData: string;
    }>;
    getProfileView(req: any): Promise<{
        title: string;
        layout: string;
        manager: any;
        user: import("mongoose").Document<unknown, {}, import("./schemas/rental-profile.schema").RentalProfile, {}, {}> & import("./schemas/rental-profile.schema").RentalProfile & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    getReviewsView(req: any): {
        title: string;
        layout: string;
        manager: any;
    };
    updateProfile(req: any, data: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/rental-profile.schema").RentalProfile, {}, {}> & import("./schemas/rental-profile.schema").RentalProfile & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    addRental(req: any, data: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/rental-property.schema").RentalProperty, {}, {}> & import("./schemas/rental-property.schema").RentalProperty & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateRental(req: any, id: string, data: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/rental-property.schema").RentalProperty, {}, {}> & import("./schemas/rental-property.schema").RentalProperty & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    deleteRental(req: any, id: string): Promise<{
        success: boolean;
    }>;
    updateQuantity(req: any, id: string, change: number): Promise<import("mongoose").Document<unknown, {}, import("./schemas/rental-property.schema").RentalProperty, {}, {}> & import("./schemas/rental-property.schema").RentalProperty & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
//# sourceMappingURL=rentals.controller.d.ts.map