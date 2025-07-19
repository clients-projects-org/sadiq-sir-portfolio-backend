import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogCategory } from './entities/blog-category.entity';
import { BlogCategoryService } from './blog-category.service';
import { BlogCategoryController } from './blog-category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BlogCategory])],
  providers: [BlogCategoryService],
  controllers: [BlogCategoryController],
  exports: [BlogCategoryService],
})
export class BlogCategoryModule {}
