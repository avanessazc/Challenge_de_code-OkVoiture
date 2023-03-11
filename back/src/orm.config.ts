import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Cars } from './cars/cars.entity';

// export const config: TypeOrmModuleOptions = {
//     type: 'postgres',
//     username: process.env.POSTGRES_USER,
//     password: process.env.POSTGRES_PASSWORD,
//     port: parseInt(process.env.POSTGRES_PORT) || 5432,
//     host: process.env.POSTGRES_HOST,
//     database: process.env.POSTGRES_DB,
//     synchronize: true,
//     entities: ['/dist/**/*.entity{.ts,.js}',
//         ]
// }

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  username: process.env.POSTGRES_USER || 'admin',
  password: process.env.POSTGRES_PASSWORD || 'secret',
  port: parseInt(process.env.POSTGRES_PORT) || 5432,
  host: process.env.POSTGRES_HOST || 'postgresql_c',
  database: process.env.POSTGRES_DB || 'okvoiture',
  synchronize: true,
  entities: [Cars],
  // entities: ['/dist/**/*.entity{.ts,.js}'],
};
