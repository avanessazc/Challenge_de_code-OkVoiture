import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cars } from '../entities/cars.entity';
import { CarsRepository } from './cars.repository';
import { JwtService } from '@nestjs/jwt';
// import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    // MulterModule.register({ dest: './photos' }),
    TypeOrmModule.forFeature([Cars]),
  ],
  controllers: [CarsController],
  providers: [CarsService, CarsRepository, JwtService],
})
export class CarsModule {}
