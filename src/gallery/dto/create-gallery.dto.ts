import { IsString, IsOptional, IsIn, IsInt } from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';

  @IsInt()
  categoryId: number;
}
