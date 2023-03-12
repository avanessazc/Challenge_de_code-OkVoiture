import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Multer } from 'multer';
import { CarsService } from './cars.service';
import { CarFormValuesDto } from './dtos';
import { saveImageToStorage } from '../helpers-images/images-storage';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @Post()
  @UseInterceptors(FileInterceptor('photo', saveImageToStorage))
  createNewCar(
    @Body() car: CarFormValuesDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    if (photo) {
      car.photo_name = photo.filename;
    }
    console.log(car);
    console.log(photo);
    // console.log(process.env.POSTGRES_USER);
    // console.log(process.env.POSTGRES_PASSWORD);
    // console.log(process.env.POSTGRES_PORT);
    // console.log(process.env.POSTGRES_HOST);
    // console.log(process.env.POSTGRES_DB);
    return this.carsService.createNewCar(car);
  }
}
