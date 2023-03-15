import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cars, Owners } from '../entities';
import { CarsRepository } from './cars.repository';
import { JwtService } from '@nestjs/jwt';
import { OwnersService } from '../owners/owners.service';
import { OwnersRepository } from 'src/owners/owners.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Cars, Owners])],
  controllers: [CarsController],
  providers: [
    CarsService,
    CarsRepository,
    JwtService,
    OwnersService,
    OwnersRepository,
  ],
})
export class CarsModule {}
