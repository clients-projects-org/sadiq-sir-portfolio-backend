import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GalleryCategory } from 'src/gallery-category/entities/gallery-category.entity';
import { UploadService } from 'src/upload/upload.service';
import { Repository } from 'typeorm';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { Gallery } from './entities/gallery.entity';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepo: Repository<Gallery>,

    @InjectRepository(GalleryCategory)
    private readonly categoryRepo: Repository<GalleryCategory>,
    private readonly uploadService: UploadService,
  ) {}
  private getImageUrl(filename?: string): string | null {
    if (!filename) return null;
    return `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/gallery/${filename}`;
  }

  async create(dto: CreateGalleryDto) {
    const category = await this.categoryRepo.findOneBy({ id: dto.categoryId });
    if (!category) throw new NotFoundException('Category not found');

    const gallery = this.galleryRepo.create({ ...dto, category });
    await this.galleryRepo.save(gallery);
    return { success: true, data: gallery };
  }

  async findAll() {
    const list = await this.galleryRepo.find();
    return {
      success: true,
      data: list.map((item) => ({
        ...item,
        imageUrl: this.getImageUrl(item.image),
      })),
    };
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
