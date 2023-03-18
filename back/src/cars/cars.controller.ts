import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  ConflictException,
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
    const ret = await this.carsService.findByNumberplate(info.numberplate);
    if (ret) {
      throw new ConflictException('Car ' + dataBaseErrors[0].message);
    }
    const token = this.carsService.createToken(car, owner);
    this.carsService.sendConfirmationEmail(info.email, token);
  }

  @Get('email-confirmation/:token')
  async registerInfoForm(@Param('token') token: string): Promise<Cars> {
    const info: { car: CarFormValuesDto; owner: OwnerFormValuesDto } =
      this.carsService.verifyToken(token);
    const ret = await this.carsService.findByNumberplate(info.car.numberplate);
    if (ret) {
      throw new ConflictException('Car ' + dataBaseErrors[0].message);
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
    return await this.carsService.createNewCar(newCar);
  }

  @Get('list')
  async getCarsList(): Promise<Cars[]> {
    return await this.carsService.getCarsLis();
  }

  // Serving Static Files from NestJS
  @Get('photos/:name')
  async servePhoto(@Param('name') name, @Res() res) {
    try {
      res.sendFile(name, { root: 'photos' }, (error) => {
        if (error) {
          console.log(name, 'Photo file does not exist');
        }
      });
    } catch (error) {
      console.log('photo_name:', error);
    }
  }
}
