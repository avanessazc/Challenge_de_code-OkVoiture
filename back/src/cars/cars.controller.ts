import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Redirect,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  ConflictException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { CarsService } from './cars.service';
import { OwnersService } from '../owners/owners.service';
import { CarFormValuesDto, InfoFormDto } from './dtos';
import { OwnerFormValuesDto } from '../owners/dtos';
import { saveImageToStorage } from '../helpers-images/images-storage';
import { dataBaseErrors } from '../errors';
import { Cars } from '../entities';

@Controller('cars')
export class CarsController {
  constructor(
    private readonly carsService: CarsService,
    private readonly ownersService: OwnersService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo', saveImageToStorage))
  async validateCarInformation(
    @Body() info: InfoFormDto,
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<void> {
    // let car: CarFormValuesDto;
    // let owner: OwnerFormValuesDto;
    if (photo === undefined) {
      throw new BadRequestException('Photo is missing');
    }
    const owner: OwnerFormValuesDto = {
      username: info.username,
      email: info.email,
    };

    const car: CarFormValuesDto = {
      designation: info.designation,
      city: info.city,
      numberplate: info.numberplate,
      price: info.price,
      photo_name: photo.filename,
    };
    const ret = await this.carsService.checkIfCarExist(info);
    if (ret) {
      //DELETE PHOTO
      throw new ConflictException('Car ' + dataBaseErrors[0].message);
    }

    const token = this.carsService.createToken(car, owner);

    this.carsService.sendConfirmationEmail(info.email, token);

    console.log(info);
    console.log(photo);
  }

  @Redirect()
  @Get('email-confirmation/:token')
  async registerInfoForm(
    @Param('token') token: string,
  ): Promise<{ statusCode: number; url: string }> {
    const info: { car: CarFormValuesDto; owner: OwnerFormValuesDto } | null =
      this.carsService.verifyToken(token);
    let url = '';
    if (info == null) {
      url = 'http://localhost:8080/email-confirmation/failed';
      return { statusCode: HttpStatus.FOUND, url };
    }
    const ret = await this.carsService.checkIfCarExist(info.car);
    if (ret) {
      url = 'http://localhost:8080/email-confirmation/failed';
      return { statusCode: HttpStatus.FOUND, url };
    }

    const newOwner = await this.ownersService.createOwner(info.owner);
    const newCar = new Cars();
    newCar.id = info.car.id;
    newCar.designation = info.car.designation;
    newCar.numberplate = info.car.numberplate;
    newCar.city = info.car.city;
    newCar.price = info.car.price;
    newCar.photo_name = info.car.photo_name;
    newCar.owner = newOwner;
    await this.carsService.createNewCar(newCar);
    url = 'http://localhost:8080/email-confirmation/successful';
    return { statusCode: HttpStatus.FOUND, url };
  }
}
