import { Module, Global } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CarsController } from './cars/cars.controller';
import { CarsService } from './cars/cars.service';
import { CarsRepository } from './cars/cars.repository';
import { Cars } from './entities/cars.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailController } from './email/email.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';

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
      entities: [Cars],
    }),
    JwtModule.register({
      secret: process.env.EMAIL_SECRET || 'TOP_SECRET',
      signOptions: {
        expiresIn: parseInt(process.env.EXPIRE_TIME_EMAIL_SECRET) || 60,
      },
    }),
    CarsModule,
  ],
  controllers: [CarsController, EmailController],
  providers: [CarsService, CarsRepository, JwtService],
})
export class AppModule {}
