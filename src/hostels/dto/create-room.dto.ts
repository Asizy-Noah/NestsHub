import { IsString, IsNumber, IsBoolean, IsObject } from 'class-validator';

export class CreateRoomDto {
  @IsNumber()
  totalRooms!: number;

  @IsString()
  type!: string;

  @IsBoolean()
  isSelfContained!: boolean;

  @IsNumber()
  floorLevel!: number;

  @IsObject()
  cooking!: { allowed: boolean; method: string };

  @IsNumber()
  pricePerSemester!: number;
}