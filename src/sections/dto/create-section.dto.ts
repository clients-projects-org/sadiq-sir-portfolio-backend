import { IsOptional, IsString, IsIn } from 'class-validator';

export class CreateSectionDto {
  @IsString()
  key: string; // ✅ Required

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}
