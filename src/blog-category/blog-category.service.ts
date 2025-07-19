import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogCategory } from './entities/blog-category.entity';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';

@Injectable()
export class BlogCategoryService {
  constructor(
    @InjectRepository(BlogCategory)
    private readonly repo: Repository<BlogCategory>,
  ) {}

  async create(dto: CreateBlogCategoryDto) {
    const category = this.repo.create(dto);
    await this.repo.save(category);
    return { success: true, data: category };
  }

  async findAll() {
    const categories = await this.repo.find();
    return { success: true, data: categories };
  }

  async findOne(id: number) {
    const category = await this.repo.findOneBy({ id });
    if (!category) throw new NotFoundException('Category not found');
    return { success: true, data: category };
  }

  async update(id: number, dto: UpdateBlogCategoryDto) {
    const category = await this.repo.findOneBy({ id });
    if (!category) throw new NotFoundException('Category not found');
    const updated = this.repo.merge(category, dto);
    await this.repo.save(updated);
    return { success: true, data: updated };
  }

  async remove(id: number) {
    const category = await this.repo.findOneBy({ id });
    if (!category) throw new NotFoundException('Category not found');
    await this.repo.remove(category);
    return { success: true, message: 'Category deleted' };
  }
}
