import { IsString, IsNotEmpty, IsDate, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class BookingsFormValuesDto {
  @IsNotEmpty()
  @IsUUID()
  carId: string;

  @Type(() => Date)
  @IsDate()
  selectedStartDate: Date;

  @Type(() => Date)
  @IsDate()
  selectedEndDate: Date;
}
