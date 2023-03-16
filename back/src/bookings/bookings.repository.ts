import { DataSource, Repository } from 'typeorm';
import { Bookings } from '../entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookingsRepository extends Repository<Bookings> {
  constructor(private dataSource: DataSource) {
    super(Bookings, dataSource.createEntityManager());
  }
}
