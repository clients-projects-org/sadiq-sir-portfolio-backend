import { IsString, IsOptional } from 'class-validator';

export class CreateAboutMeDto {
  @IsString()
  title: string;

  @IsString()
  subtitle: string;

  @IsString()
  description: string;

  @IsOptional()
  image1?: string;

  @IsOptional()
  image2?: string;
}
