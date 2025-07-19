import { IsString, IsUrl, IsIn, IsOptional } from 'class-validator';

export class CreateSocialDto {
  @IsString()
  name: string;

  @IsString()
  icon: string;

  @IsUrl()
  url: string;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}
