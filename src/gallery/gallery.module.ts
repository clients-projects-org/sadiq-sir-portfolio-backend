import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gallery } from './entities/gallery.entity';
import { GalleryCategory } from 'src/gallery-category/entities/gallery-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gallery, GalleryCategory])],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
