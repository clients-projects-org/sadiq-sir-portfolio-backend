import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Blog } from './entities/blog.entity';
import { BlogCategory } from '../blog-category/entities/blog-category.entity';
import { BlogTag } from '../blog-tag/entities/blog-tag.entity';

import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, BlogCategory, BlogTag])],
  providers: [BlogService],
  controllers: [BlogController],
  exports: [BlogService],
})
export class BlogModule {}
