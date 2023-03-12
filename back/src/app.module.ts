import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm.config';
import { ConfigModule } from '@nestjs/config';
import { CarsController } from './cars/cars.controller';
import { CarsService } from './cars/cars.service';
import { CarsRepository } from './cars/cars.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(config),
    CarsModule,
  ],
  controllers: [CarsController],
  providers: [CarsService, CarsRepository],
})
export class AppModule {}
