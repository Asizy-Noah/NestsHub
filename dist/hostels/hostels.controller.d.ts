import { HostelsService } from './hostels.service';
import { CreateHostelDto, UpdateHostelDto, ApplyVerificationDto } from './dto/create-hostel.dto';
import { CreateRoomDto, UpdateRoomDto } from './dto/create-room.dto';
export declare class HostelsController {
    private readonly hostelService;
    constructor(hostelService: HostelsService);
    createHostel(req: any, createHostelDto: CreateHostelDto): Promise<import("./schemas/hostel.schema").Hostel>;
    getMyHostel(req: any): Promise<import("./schemas/hostel.schema").Hostel>;
    searchHostels(query: string, skip?: number, limit?: number): Promise<{
        data: import("./schemas/hostel.schema").Hostel[];
        total: number;
    }>;
    getVerifiedHostels(skip?: number, limit?: number): Promise<{
        data: import("./schemas/hostel.schema").Hostel[];
        total: number;
    }>;
    getHostelStats(req: any): Promise<{
        hostelId: import("mongoose").Types.ObjectId;
        name: string;
        verificationStatus: import("./schemas/hostel.schema").VerificationStatus;
        totalRooms: number;
        availableRooms: number;
        occupiedRooms: number;
        amenitiesCount: number;
    }>;
    getAllHostels(skip?: number, limit?: number): Promise<{
        data: import("./schemas/hostel.schema").Hostel[];
        total: number;
    }>;
    getHostelById(id: string): Promise<import("./schemas/hostel.schema").Hostel>;
    updateHostel(id: string, req: any, updateHostelDto: UpdateHostelDto): Promise<import("./schemas/hostel.schema").Hostel>;
    applyVerification(id: string, req: any, applyVerificationDto: ApplyVerificationDto): Promise<import("./schemas/hostel.schema").Hostel>;
    createRoom(hostelId: string, req: any, createRoomDto: CreateRoomDto): Promise<import("./schemas/room.schema").Room>;
    getRoomsByHostel(hostelId: string): Promise<import("./schemas/room.schema").Room[]>;
    getRoomById(roomId: string): Promise<import("./schemas/room.schema").Room>;
    updateRoom(hostelId: string, roomId: string, req: any, updateRoomDto: UpdateRoomDto): Promise<import("./schemas/room.schema").Room>;
    deleteRoom(hostelId: string, roomId: string, req: any): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=hostels.controller.d.ts.map