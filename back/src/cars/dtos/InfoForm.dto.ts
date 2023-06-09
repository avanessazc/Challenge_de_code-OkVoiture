import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsEmail,
  Matches,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class InfoFormDto {
  id?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^([a-zA-Z0-9]+)\/([a-zA-Z0-9]+)\/([0-9]{4})$/, {
    message: 'Please enter mark/model/year',
  })
  @MaxLength(30)
  designation: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  city: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  numberplate: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  price: number;

  photo?: File;

  photo_name?: string;
}
