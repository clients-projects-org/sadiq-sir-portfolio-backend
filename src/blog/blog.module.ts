import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlogCategory } from '../blog-category/entities/blog-category.entity';
import { Blog } from './entities/blog.entity';

import { UploadModule } from 'src/upload/upload.module';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, BlogCategory]), UploadModule],
  providers: [BlogService],
  controllers: [BlogController],
  exports: [BlogService],
})
export class BlogModule {}
