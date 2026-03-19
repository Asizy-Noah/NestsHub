import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { HostelsModule } from './hostels/hostels.module';
import { HotelsModule } from './hotels/hotels.module';
import { RentalsModule } from './rentals/rentals.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/real-estate',
    ),
    AuthModule,
    AccountsModule,
    HostelsModule,
    HotelsModule,
    RentalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
