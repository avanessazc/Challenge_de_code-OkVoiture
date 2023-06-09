import { Module, Global } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { CarsController } from './cars/cars.controller';
import { CarsService } from './cars/cars.service';
import { CarsRepository } from './cars/cars.repository';
import { Cars, Owners, Bookings } from './entities';
import { OwnersController } from './owners/owners.controller';
import { OwnersService } from './owners/owners.service';
import { OwnersModule } from './owners/owners.module';
import { OwnersRepository } from './owners/owners.repository';
import { BookingsController } from './bookings/bookings.controller';
import { BookingsService } from './bookings/bookings.service';
import { BookingsModule } from './bookings/bookings.module';
import { BookingsRepository } from './bookings/bookings.repository';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SENDGRID_HOST,
        auth: {
          user: process.env.SENDGRID_USER,
          pass: process.env.SENDGRID_PASS,
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: parseInt(process.env.POSTGRES_PORT),
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      entities: [Cars, Owners, Bookings],
    }),
    JwtModule.register({
      secret: process.env.EMAIL_SECRET,
      signOptions: {
        expiresIn: parseInt(process.env.EXPIRE_TIME_EMAIL_SECRET),
      },
    }),
    CarsModule,
    OwnersModule,
    BookingsModule,
  ],
  controllers: [CarsController, OwnersController, BookingsController],
  providers: [
    CarsService,
    CarsRepository,
    JwtService,
    OwnersService,
    OwnersRepository,
    BookingsService,
    BookingsRepository,
  ],
})
export class AppModule {}
