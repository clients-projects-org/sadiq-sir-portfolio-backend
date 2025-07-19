import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GalleryCategory } from './entities/gallery-category.entity';
import { CreateGalleryCategoryDto } from './dto/create-gallery-category.dto';
import { UpdateGalleryCategoryDto } from './dto/update-gallery-category.dto';

@Injectable()
export class GalleryCategoryService {
  constructor(
    @InjectRepository(GalleryCategory)
    private readonly categoryRepo: Repository<GalleryCategory>,
  ) {}

  async create(dto: CreateGalleryCategoryDto) {
    const category = this.categoryRepo.create(dto);
    await this.categoryRepo.save(category);
    return { success: true, data: category };
  }

  async findAllWithCount() {
    const categories = await this.categoryRepo.find({
      relations: ['galleries'],
    });

    return {
      success: true,
      data: categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        status: cat.status,
        galleryCount: cat.galleries?.length || 0,
      })),
    };
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['galleries'],
    });
    if (!category) throw new NotFoundException('Gallery category not found');

    return {
      success: true,
      data: {
        id: category.id,
        name: category.name,
        status: category.status,
        galleryCount: category.galleries?.length || 0,
      },
    };
  }

  async update(id: number, dto: UpdateGalleryCategoryDto) {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) throw new NotFoundException('Gallery category not found');

    const updated = this.categoryRepo.merge(category, dto);
    await this.categoryRepo.save(updated);
    return { success: true, message: 'Category updated', data: updated };
  }

  async remove(id: number) {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) throw new NotFoundException('Gallery category not found');

    await this.categoryRepo.remove(category);
    return { success: true, message: 'Category deleted' };
  }
}
