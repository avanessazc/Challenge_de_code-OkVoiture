import { Controller, Get, Post, Body } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarFormValuesDto } from './dtos';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  info(@Body() car: CarFormValuesDto) {
    console.log(car);
    console.log(process.env.POSTGRES_USER);
    console.log(process.env.POSTGRES_PASSWORD);
    console.log(process.env.POSTGRES_PORT);
    console.log(process.env.POSTGRES_HOST);
    console.log(process.env.POSTGRES_DB);
    return this.carsService.createNewCar(car);
  }
}
