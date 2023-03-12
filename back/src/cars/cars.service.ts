import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsRepository } from './cars.repository';
import { CarFormValuesDto } from './dtos';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(CarsRepository) private carsRepository: CarsRepository,
  ) {}
  async createNewCar(car: CarFormValuesDto) {
    return await this.carsRepository.save(car);
  }
}
