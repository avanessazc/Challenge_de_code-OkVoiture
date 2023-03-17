import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { CarsService } from 'src/cars/cars.service';
import { Bookings } from 'src/entities';
import { BookingsService } from './bookings.service';
import { BookingsFormValuesDto, BookingsListDto } from './dtos';
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

  @Get('list')
  async getAllBookings(): Promise<BookingsListDto[]> {
    return await this.bookingsService.findAllBookings();
  }

  @Delete('delete/:booking_id')
  async deleteBooking(
    @Param('booking_id') booking_id: string,
  ) {
    console.log('booking_id: ', booking_id)
    const ret = await this.bookingsService.deleteBooking(booking_id);
    console.log('ret: ', ret)
    return ret
  }
}
