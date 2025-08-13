import { IsIn, IsOptional, IsString } from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  imagePath?: string;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';

  @IsOptional()
  categoryId: number;
}
