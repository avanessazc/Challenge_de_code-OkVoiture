import { DataSource, Repository } from 'typeorm';
import { Cars } from '../entities/cars.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CarsRepository extends Repository<Cars> {
  constructor(private dataSource: DataSource) {
    super(Cars, dataSource.createEntityManager());
  }
}
