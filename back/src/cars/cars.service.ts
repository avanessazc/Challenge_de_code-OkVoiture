import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsRepository } from './cars.repository';
import { CarFormValuesDto } from './dtos';
import { dataBaseErrors } from '../errors';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(CarsRepository) private carsRepository: CarsRepository,
    private mailService: MailerService,
    private jwtService: JwtService,
  ) {}

  async checkIfCarExist(
    car: CarFormValuesDto,
  ): Promise<CarFormValuesDto | null> {
    return await this.carsRepository.findOne({
      where: {
        numberplate: car.numberplate,
      },
    });
  }

  createToken(car: CarFormValuesDto): string {
    return this.jwtService.sign(car, {
      secret: process.env.EMAIL_SECRET,
      expiresIn: parseInt(process.env.EXPIRE_TIME_EMAIL_SECRET),
    });
  }

  verifyToken(token: string): CarFormValuesDto | null {
    try {
      const { iat, exp, ...car } = this.jwtService.verify(token, {
        secret: process.env.EMAIL_SECRET,
      });
      return car;
    } catch (error) {
      console.log('Error while verifying Token: ', error.message);
      // throw new BadRequestException(error.message);
    }
    return null;
  }

  sendConfirmationEmail(toemail: string, token: string): void {
    const url = `http://localhost:3000/cars/email-confirmation/${token}`;
    this.mailService
      .sendMail({
        to: toemail,
        from: process.env.FROM_EMAIL,
        subject: 'Confirm email OkVoiture Challenge',
        html: ` <h1>Welcome to OKVoiture!</h1>
                <p>Please click to confirm your email:</p>
                <a href="${url}">HERE!</a>`,
      })
      .then(() => {
        console.log('Email sent!');
      })
      .catch((error) => {
        console.log('Error while sending email.', error.message);
      });
  }

  async createNewCar(car: CarFormValuesDto): Promise<CarFormValuesDto | never> {
    try {
      const ret = await this.carsRepository.save(car);
      return ret;
    } catch (error) {
      if (error.code === dataBaseErrors[0].code) {
        throw new ConflictException('Car ' + dataBaseErrors[0].message);
      } else if (error.code === dataBaseErrors[1].code) {
        throw new ConflictException('Car ' + dataBaseErrors[1].message);
      } else {
        console.log(error.code);
        console.log(error.message);
        throw new InternalServerErrorException();
      }
    }
  }
}
