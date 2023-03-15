import { DataSource, Repository } from 'typeorm';
import { Owners } from '../entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OwnersRepository extends Repository<Owners> {
  constructor(private dataSource: DataSource) {
    super(Owners, dataSource.createEntityManager());
  }
}
