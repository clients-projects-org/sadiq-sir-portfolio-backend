import { IsEmail, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  address: string;
}
