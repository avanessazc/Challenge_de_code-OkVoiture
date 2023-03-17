import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Owners, Bookings } from '../entities';

@Entity({ name: 'cars' })
export class Cars {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30 })
  designation: string;

  @Column({ type: 'varchar', length: 50 })
  city: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  numberplate: string;

  @Column({ type: 'integer' })
  price: number;

  @Column('varchar', { length: 100 })
  photo_name: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  create_at: Date;

  @ManyToOne(() => Owners, (owner) => owner.cars)
  owner: Owners;

  @OneToMany(() => Bookings, (bookings) => bookings.car, { cascade: true })
  bookings: Bookings[];
}
