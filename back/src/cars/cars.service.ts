import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsRepository } from './cars.repository';
import { CarFormValuesDto } from './dtos';
import { dataBaseErrors } from '../errors';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(CarsRepository) private carsRepository: CarsRepository,
  ) {}
  async createNewCar(car: CarFormValuesDto): Promise<CarFormValuesDto | never> {
    try {
      const ret = await this.carsRepository.save(car);
      return ret;
    } catch (error) {
      if (error.code === dataBaseErrors[0].code) {
        throw new ConflictException('Car ' + dataBaseErrors[0].message);
      } else if (error.code === dataBaseErrors[1].code) {
        throw new ConflictException('Car ' + dataBaseErrors[1].message);
      } else {
        console.log(error.code);
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }
}
