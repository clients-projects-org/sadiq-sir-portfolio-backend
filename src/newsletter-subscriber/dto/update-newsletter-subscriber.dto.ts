import { IsEmail, IsIn, IsOptional } from 'class-validator';

export class UpdateNewsletterSubscriberDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}
