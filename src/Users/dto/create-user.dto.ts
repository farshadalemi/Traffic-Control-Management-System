import { IsDate, IsNumber, IsString } from 'class-validator';
import { Car } from '../user.schema';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  national_code: number;

  @IsNumber()
  age: number;

  @IsDate()
  date_of_bitrh: Date;

  @IsNumber()
  total_toll_paid: number;

  ownerCar: [Car];
}
