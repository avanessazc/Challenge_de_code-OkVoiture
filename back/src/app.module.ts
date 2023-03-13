import { Module, Global } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CarsController } from './cars/cars.controller';
import { CarsService } from './cars/cars.service';
import { CarsRepository } from './cars/cars.repository';
import { MulterModule } from '@nestjs/platform-express';
import { Cars } from './entities/cars.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailController } from './email.controller';

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
          pass:
            process.env.SENDGRID_PASS,
        },
      },
      // template: {
      //   dir: __dirname + '/templates',
      //   adapter: new PugAdapter(),
      //   options: {
      //     strict: true,
      //   },
      // },
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
    CarsModule,
  ],
  controllers: [CarsController, EmailController],
  providers: [CarsService, CarsRepository],
})
export class AppModule {}
