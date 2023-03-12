import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cars' })
export class Cars {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30 })
  username: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 30 })
  designation: string;

  @Column({ type: 'varchar', length: 50 })
  city: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  numberplate: string;

  @Column({ type: 'int' })
  price: number;

  // @Column("varchar", { length: 100 })
  // photo_url: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  create_at: Date;
}
