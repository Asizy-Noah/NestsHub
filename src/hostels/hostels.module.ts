import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HostelsService } from './hostels.service';
import { HostelsController } from './hostels.controller';
import { Hostel, HostelSchema } from './schemas/hostel.schema';
import { Room, RoomSchema } from './schemas/room.schema';
import { AuthModule } from '@/auth/auth.module';
import { Account, AccountSchema } from '../accounts/schemas/account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hostel.name, schema: HostelSchema },
      { name: Room.name, schema: RoomSchema },
      { name: Account.name, schema: AccountSchema },
    ]),
    AuthModule
  ],
  controllers: [HostelsController],
  providers: [HostelsService],
  exports: [HostelsService],
})
export class HostelsModule {}
