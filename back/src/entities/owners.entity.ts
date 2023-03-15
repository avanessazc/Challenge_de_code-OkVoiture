import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cars } from '../entities';

@Entity({ name: 'owners' })
export class Owners {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30 })
  username: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @OneToMany(() => Cars, (cars) => cars.owner, { cascade: true })
  cars: Cars[];
}
