import { Module } from '@nestjs/common';
import { GalleryCategoryService } from './gallery-category.service';
import { GalleryCategoryController } from './gallery-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryCategory } from './entities/gallery-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GalleryCategory])],
  controllers: [GalleryCategoryController],
  providers: [GalleryCategoryService],
  exports: [TypeOrmModule],
})
export class GalleryCategoryModule {}
