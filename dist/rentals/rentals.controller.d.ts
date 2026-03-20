import { RentalsService } from './rentals.service';
import { CreateRentalDto, UpdateRentalDto } from './dto/create-rental.dto';
export declare class RentalsController {
    private rentalsService;
    constructor(rentalsService: RentalsService);
    createRental(req: any, createRentalDto: CreateRentalDto): Promise<import("./schemas/rental-property.schema").RentalProperty>;
    getMyRentals(req: any, limit?: number, offset?: number): Promise<{
        rentals: import("./schemas/rental-property.schema").RentalProperty[];
        total: number;
    }>;
    getDashboardStats(req: any): Promise<any>;
    searchRentals(query?: string, houseType?: string, city?: string, town?: string, verified?: boolean, limit?: number, offset?: number): Promise<{
        rentals: import("./schemas/rental-property.schema").RentalProperty[];
        total: number;
    }>;
    getVerifiedRentals(limit?: number, offset?: number): Promise<{
        rentals: import("./schemas/rental-property.schema").RentalProperty[];
        total: number;
    }>;
    getRentalById(id: string): Promise<import("./schemas/rental-property.schema").RentalProperty>;
    updateRental(id: string, req: any, updateRentalDto: UpdateRentalDto): Promise<import("./schemas/rental-property.schema").RentalProperty>;
    deleteRental(id: string, req: any): Promise<{
        message: string;
    }>;
    toggleRentalActive(id: string, req: any, body: {
        isActive: boolean;
    }): Promise<import("./schemas/rental-property.schema").RentalProperty>;
    applyForVerification(id: string, req: any): Promise<import("./schemas/rental-property.schema").RentalProperty>;
    uploadVerificationProof(id: string, req: any, body: {
        proofUrl: string;
    }): Promise<import("./schemas/rental-property.schema").RentalProperty>;
}
//# sourceMappingURL=rentals.controller.d.ts.map