import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookings, Cars, Owners } from '../entities';
import { BookingsRepository } from './bookings.repository';
import { JwtService } from '@nestjs/jwt';
import { BookingsService } from './bookings.service';
import { CarsService } from 'src/cars/cars.service';
import { BookingsController } from './bookings.controller';

@Module({})
export class BookingsModule {}

@Module({
  imports: [TypeOrmModule.forFeature([Owners, Cars, Bookings])],
  controllers: [BookingsController],
  providers: [BookingsService, BookingsRepository, JwtService, CarsService],
})
export class OwnersModule {}
