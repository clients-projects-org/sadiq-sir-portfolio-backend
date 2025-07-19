import {
  IsString,
  IsOptional,
  IsIn,
  IsInt,
  IsArray,
  ArrayNotEmpty,
  IsUrl,
} from 'class-validator';

export class CreateBlogDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsString()
  shortDescription?: string;

  @IsOptional()
  @IsString()
  longDescription?: string;

  @IsOptional()
  @IsString()
  seoTitle?: string;

  @IsOptional()
  @IsString()
  seoDescription?: string;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';

  @IsInt()
  categoryId: number;

  @IsOptional()
  @IsArray()
  tagIds?: number[];
}
