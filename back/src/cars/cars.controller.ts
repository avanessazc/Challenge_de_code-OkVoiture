import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
// import { Multer } from 'multer';
import { CarsService } from './cars.service';
import { CarFormValuesDto } from './dtos';
import { saveImageToStorage } from '../helpers-images/images-storage';
import { dataBaseErrors } from '../errors';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo', saveImageToStorage))
  async validateCarInformation(
    @Body() car: CarFormValuesDto,
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<void> {
    if (photo === undefined) {
      throw new BadRequestException('Photo is missing');
    }
    if (photo) {
      car.photo_name = photo.filename;
    }
    const ret = await this.carsService.checkIfCarExist(car);
    if (ret) {
      throw new ConflictException('Car ' + dataBaseErrors[0].message);
    }

    const token = this.carsService.createToken(car);

    this.carsService.sendConfirmationEmail(car.email, token);

    console.log(car);
    console.log(photo);
  }

  @Get('email-confirmation/:token')
  async createNewCar(@Param('token') token: string): Promise<CarFormValuesDto> {
    const car: CarFormValuesDto = {
      username: '',
      email: '',
      designation: '',
      city: '',
      numberplate: '',
      price: '',
      photo_name: '',
    };
    return this.carsService.createNewCar(car);
  }
}
