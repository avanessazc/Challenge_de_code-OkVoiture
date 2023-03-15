import { IsString, IsNotEmpty, MaxLength, IsEmail } from 'class-validator';

export class OwnerFormValuesDto {
  id?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;
}
