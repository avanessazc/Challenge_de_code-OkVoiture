import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Cars } from '.';

@Entity({ name: 'bookings' })
export class Bookings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date'})
  start_date: Date;

  @Column({ type: 'date'})
  end_date: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  create_at: Date;

  @ManyToOne(() => Cars, (car) => car.bookings)
  car: Cars;
}
