import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookings, Cars } from '../entities';
import { BookingsRepository } from './bookings.repository';
import { BookingsFormValuesDto, BookingsListDto } from './dtos';

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
    if (bookingList) {
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

  async findAllBookings(): Promise<BookingsListDto[]> {
    return await this.bookingsRepository.query(
      `SELECT "bookings"."id",
                  to_char("bookings"."start_date",'dd/mm/yyyy') as start_date,
		              to_char("bookings"."end_date",'dd/mm/yyyy') as end_date,
                  "bookings"."create_at",
                  "bookings"."carId",
                  "cars"."designation",
                  "cars"."city",
                  "cars"."numberplate",
                  "owners"."username",
                  "owners"."email"
          FROM bookings
          INNER JOIN cars ON bookings."carId" = cars."id"
          INNER JOIN owners ON cars."ownerId" = owners."id"
          ORDER BY "owners"."email" ASC,
                    "bookings"."carId" ASC,
                    "bookings"."start_date" ASC`,
    );
  }
}
