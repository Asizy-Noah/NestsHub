import { Model, Types } from 'mongoose';
import { Hostel, VerificationStatus } from './schemas/hostel.schema';
import { Room } from './schemas/room.schema';
import { CreateHostelDto, UpdateHostelDto, ApplyVerificationDto } from './dto/create-hostel.dto';
import { CreateRoomDto, UpdateRoomDto } from './dto/create-room.dto';
export declare class HostelsService {
    private hostelModel;
    private roomModel;
    constructor(hostelModel: Model<Hostel>, roomModel: Model<Room>);
    createHostel(managerId: string, createHostelDto: CreateHostelDto): Promise<Hostel>;
    findHostelByManager(managerId: string): Promise<Hostel>;
    findHostelById(hostelId: string): Promise<Hostel>;
    getAllHostels(skip?: number, limit?: number): Promise<{
        data: Hostel[];
        total: number;
    }>;
    getVerifiedHostels(skip?: number, limit?: number): Promise<{
        data: Hostel[];
        total: number;
    }>;
    updateHostel(hostelId: string, managerId: string, updateHostelDto: UpdateHostelDto): Promise<Hostel>;
    applyVerification(hostelId: string, managerId: string, applyVerificationDto: ApplyVerificationDto): Promise<Hostel>;
    searchHostels(query: string, skip?: number, limit?: number): Promise<{
        data: Hostel[];
        total: number;
    }>;
    createRoom(hostelId: string, managerId: string, createRoomDto: CreateRoomDto): Promise<Room>;
    getRoomsByHostel(hostelId: string): Promise<Room[]>;
    getRoomById(roomId: string): Promise<Room>;
    updateRoom(roomId: string, hostelId: string, managerId: string, updateRoomDto: UpdateRoomDto): Promise<Room>;
    deleteRoom(roomId: string, hostelId: string, managerId: string): Promise<void>;
    getHostelStats(managerId: string): Promise<{
        hostelId: Types.ObjectId;
        name: string;
        verificationStatus: VerificationStatus;
        totalRooms: number;
        availableRooms: number;
        occupiedRooms: number;
        amenitiesCount: number;
    }>;
}
//# sourceMappingURL=hostels.service.d.ts.map