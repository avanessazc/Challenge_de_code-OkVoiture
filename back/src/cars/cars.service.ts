import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsRepository } from './cars.repository';
import { CarFormValuesDto } from './dtos';
import { OwnerFormValuesDto } from '../owners/dtos';
import { dataBaseErrors } from '../errors';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import { Cars } from '../entities';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(CarsRepository) private carsRepository: CarsRepository,
    private mailService: MailerService,
    private jwtService: JwtService,
  ) {}

  async findByNumberplate(numberplate: string): Promise<Cars | null> {
    return await this.carsRepository.findOne({
      where: {
        numberplate: numberplate,
      },
    });
  }

  async findByid(id: string): Promise<Cars | null> {
    return await this.carsRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  createToken(car: CarFormValuesDto, owner: OwnerFormValuesDto): string {
    return this.jwtService.sign(
      { car, owner },
      {
        secret: process.env.EMAIL_SECRET,
        expiresIn: parseInt(process.env.EXPIRE_TIME_EMAIL_SECRET),
      },
    );
  }

  verifyToken(
    token: string,
  ): { car: CarFormValuesDto; owner: OwnerFormValuesDto } | never {
    try {
      const { iat, exp, car, owner } = this.jwtService.verify(token, {
        secret: process.env.EMAIL_SECRET,
      });
      return { car, owner };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  sendConfirmationEmail(toemail: string, token: string): void {
    const url = `http://localhost:8080/email-confirmation/${token}`;
    this.mailService
      .sendMail({
        to: toemail,
        from: process.env.FROM_EMAIL,
        subject: 'Confirm email OkVoiture Challenge',
        html: `
        <h3> Hello! </h3>
        <p>Thank you for registering into our Application. Much Appreciated! Just one last step is laying ahead of you...</p>
        <p>To finish registering your car, please follow this link: <a href="${url}">Confirm</a></p>
        <p>Cheers</p>
        <p>OkVoiture Team</p>
      `,
      })
      .then(() => {
        console.log('Email sent!');
      })
      .catch((error) => {
        console.log('Error while sending email.', error.message);
      });
  }

  async createNewCar(car: Cars): Promise<Cars | never> {
    try {
      const ret = await this.carsRepository.save(car);
      return ret;
    } catch (error) {
      if (error.code === dataBaseErrors[0].code) {
        throw new ConflictException('Car ' + dataBaseErrors[0].message);
      } else if (error.code === dataBaseErrors[1].code) {
        throw new ConflictException('Car ' + dataBaseErrors[1].message);
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async getCarsLis(): Promise<Cars[]> {
    return await this.carsRepository.find({
      order: {
        price: 'ASC',
      },
    });
  }
}
