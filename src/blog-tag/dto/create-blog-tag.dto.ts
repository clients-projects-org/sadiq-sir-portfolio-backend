import { IsString } from 'class-validator';

export class CreateBlogTagDto {
  @IsString()
  name: string;
}
