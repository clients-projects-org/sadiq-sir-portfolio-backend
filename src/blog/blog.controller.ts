import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/helper/auth-guard/auth.guard';
import { UploadService } from 'src/upload/upload.service';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
export class BlogController {
  constructor(
    private readonly service: BlogService,
    private readonly uploadService: UploadService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    new UploadService().createUploadInterceptor({
      fieldName: 'imageFile',
      destination: './uploads/blog',
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateBlogDto,
  ) {
    if (file) dto.image = file.filename;
    return this.service.create(dto);
  }

  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('status') status?: 'active' | 'inactive',
  ) {
    return this.service.findAll(page, limit, search, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @UseInterceptors(
    new UploadService().createUploadInterceptor({
      fieldName: 'imageFile',
      destination: './uploads/blog',
    }),
  )
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdateBlogDto,
  ) {
    if (file) dto.image = file.filename;
    return this.service.update(+id, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
