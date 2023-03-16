import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookings, Cars } from '../entities';
import { BookingsRepository } from './bookings.repository';
import { BookingsFormValuesDto } from './dtos';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(BookingsRepository)
    private bookingsRepository: BookingsRepository,
  ) {}

  async findByCarId(carId: string): Promise<Bookings[] | null> {
    return await this.bookingsRepository.find({
      relations: {
        car: true,
      },
      where: { car: { id: carId } },
    });
  }

  async checkBooking(body: BookingsFormValuesDto): Promise<Bookings> {
    const bookingList = await this.findByCarId(body.carId);
    let check: Bookings = null;
    console.log('check: ', check);
    if (bookingList) {
      console.log('AQUI: ', bookingList);

      for (let i = 0; i < bookingList.length; i++) {
        if (
          (new Date(body.selectedStartDate) >=
            new Date(bookingList[i].start_date) &&
            new Date(body.selectedStartDate) <=
              new Date(bookingList[i].end_date)) ||
          (new Date(body.selectedEndDate) >=
            new Date(bookingList[i].start_date) &&
            new Date(body.selectedEndDate) <= new Date(bookingList[i].end_date))
        ) {
          check = bookingList[i];
          return check;
        }
      }
    }
    return check;
  }

  async createBooking(car: Cars, start: Date, end: Date): Promise<Bookings> {
    const newBooking = new Bookings();
    newBooking.start_date = start;
    newBooking.end_date = end;
    newBooking.car = car;
    return await this.bookingsRepository.save(newBooking);
  }
}
