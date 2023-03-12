import { Module, Global } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm.config';
import { ConfigModule } from '@nestjs/config';
import { CarsController } from './cars/cars.controller';
import { CarsService } from './cars/cars.service';
import { CarsRepository } from './cars/cars.repository';
import { MulterModule } from '@nestjs/platform-express';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // MulterModule.register({ dest: './photos' }),
    TypeOrmModule.forRoot(config),
    CarsModule,
  ],
  controllers: [CarsController],
  providers: [CarsService, CarsRepository],
})
export class AppModule {}
