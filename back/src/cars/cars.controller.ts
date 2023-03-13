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
  BadRequestException,
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
  ): Promise<CarFormValuesDto | never> {
    if (photo === undefined) {
      throw new BadRequestException('Photo is missing');
    }
    if (photo) {
      car.photo_name = photo.filename;
    }
    console.log(car);
    console.log(photo);
    return this.carsService.createNewCar(car);
  }
}
