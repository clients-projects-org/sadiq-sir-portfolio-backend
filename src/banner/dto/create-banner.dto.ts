import { IsOptional, IsString } from 'class-validator';

export class CreateBannerDto {
  @IsString()
  title: string;

  @IsString()
  subtitle: string;

  @IsString()
  banner: string;

  @IsString()
  banner_description: string;

  @IsString()
  banner_title: string;

  @IsString()
  image_subtitle: string;

  @IsOptional()
  imagePath?: string;
}
