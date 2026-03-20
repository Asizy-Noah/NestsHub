import { Model } from 'mongoose';
import { RentalProperty } from './schemas/rental-property.schema';
import { CreateRentalDto, UpdateRentalDto } from './dto/create-rental.dto';
export declare class RentalsService {
    private rentalPropertyModel;
    constructor(rentalPropertyModel: Model<RentalProperty>);
    createRental(managerId: string, createRentalDto: CreateRentalDto): Promise<RentalProperty>;
    getRentalById(id: string): Promise<RentalProperty>;
    getRentalsByManager(managerId: string, limit?: number, offset?: number): Promise<{
        rentals: RentalProperty[];
        total: number;
    }>;
    updateRental(rentalId: string, managerId: string, updateRentalDto: UpdateRentalDto): Promise<RentalProperty>;
    deleteRental(rentalId: string, managerId: string): Promise<void>;
    toggleRentalActive(rentalId: string, managerId: string, isActive: boolean): Promise<RentalProperty>;
    applyForVerification(rentalId: string, managerId: string): Promise<RentalProperty>;
    uploadVerificationProof(rentalId: string, managerId: string, proofUrl: string): Promise<RentalProperty>;
    searchRentals(query?: string, houseType?: string, city?: string, town?: string, verified?: boolean, limit?: number, offset?: number): Promise<{
        rentals: RentalProperty[];
        total: number;
    }>;
    getVerifiedRentals(limit?: number, offset?: number): Promise<{
        rentals: RentalProperty[];
        total: number;
    }>;
    getDashboardStats(managerId: string): Promise<any>;
}
//# sourceMappingURL=rentals.service.d.ts.map