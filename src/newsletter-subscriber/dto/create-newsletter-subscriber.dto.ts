import { IsEmail } from 'class-validator';

export class CreateNewsletterSubscriberDto {
  @IsEmail()
  email: string;
}
