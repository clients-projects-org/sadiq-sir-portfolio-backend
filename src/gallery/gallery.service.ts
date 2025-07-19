import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gallery } from './entities/gallery.entity';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { GalleryCategory } from 'src/gallery-category/entities/gallery-category.entity';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepo: Repository<Gallery>,

    @InjectRepository(GalleryCategory)
    private readonly categoryRepo: Repository<GalleryCategory>,
  ) {}

  async create(dto: CreateGalleryDto) {
    const category = await this.categoryRepo.findOneBy({ id: dto.categoryId });
    if (!category) throw new NotFoundException('Category not found');

    const gallery = this.galleryRepo.create({ ...dto, category });
    await this.galleryRepo.save(gallery);
    return { success: true, data: gallery };
  }

  async findAll() {
    const galleries = await this.galleryRepo.find({ relations: ['category'] });
    return { success: true, data: galleries };
  }

  async findOne(id: number) {
    const gallery = await this.galleryRepo.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!gallery) throw new NotFoundException('Gallery not found');
    return { success: true, data: gallery };
  }

  async update(id: number, dto: UpdateGalleryDto) {
    const gallery = await this.galleryRepo.findOneBy({ id });
    if (!gallery) throw new NotFoundException('Gallery not found');

    if (dto.categoryId) {
      const category = await this.categoryRepo.findOneBy({
        id: dto.categoryId,
      });
      if (!category) throw new NotFoundException('Category not found');
      gallery.category = category;
    }

    const updated = this.galleryRepo.merge(gallery, dto);
    await this.galleryRepo.save(updated);
    return { success: true, message: 'Gallery updated', data: updated };
  }

  async remove(id: number) {
    const gallery = await this.galleryRepo.findOneBy({ id });
    if (!gallery) throw new NotFoundException('Gallery not found');

    await this.galleryRepo.remove(gallery);
    return { success: true, message: 'Gallery deleted' };
  }
}
