import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { CarsService } from 'src/cars/cars.service';
import { Bookings } from 'src/entities';
import { BookingsService } from './bookings.service';
import { BookingsFormValuesDto } from './dtos';
import { format } from 'date-fns';

@Controller('bookings')
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly carsService: CarsService,
  ) {}

  @Post()
  async Booking(
    @Body()
    body: BookingsFormValuesDto,
  ): Promise<Bookings> {
    const car = await this.carsService.findByid(body.carId);
    if (!car) {
      throw new BadRequestException('CarId does not exist');
    }
    const today = format(new Date(), 'yyyy-MM-dd');
    const maxDate = format(new Date('2030-12-31'), 'yyyy-MM-dd');
    if (
      new Date(body.selectedStartDate) < new Date(today) ||
      new Date(body.selectedStartDate) > new Date(maxDate) ||
      new Date(body.selectedEndDate) < new Date(today) ||
      new Date(body.selectedEndDate) > new Date(maxDate) ||
      new Date(body.selectedStartDate) > new Date(body.selectedEndDate)
    ) {
      throw new BadRequestException('It is not possible to pick this dates');
    }
    const check = await this.bookingsService.checkBooking(body);
    if (check) {
      throw new ConflictException('Car is not available on these dates');
    }
    return this.bookingsService.createBooking(
      car,
      new Date(body.selectedStartDate),
      new Date(body.selectedEndDate),
    );
  }

  @Get()
  async getAllBookings() {}
}
