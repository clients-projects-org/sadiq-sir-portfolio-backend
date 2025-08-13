import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryCategory } from './entities/gallery-category.entity';
import { GalleryCategoryController } from './gallery-category.controller';
import { GalleryCategoryService } from './gallery-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([GalleryCategory])],
  controllers: [GalleryCategoryController],
  providers: [GalleryCategoryService],
  exports: [GalleryCategoryService],
})
export class GalleryCategoryModule {}
