import { IsString, IsOptional, IsIn } from 'class-validator';

export class CreateBlogCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}
