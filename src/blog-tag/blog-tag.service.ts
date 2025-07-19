import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogTag } from './entities/blog-tag.entity';
import { CreateBlogTagDto } from './dto/create-blog-tag.dto';
import { UpdateBlogTagDto } from './dto/update-blog-tag.dto';

@Injectable()
export class BlogTagService {
  constructor(
    @InjectRepository(BlogTag)
    private readonly repo: Repository<BlogTag>,
  ) {}

  async create(dto: CreateBlogTagDto) {
    const tag = this.repo.create(dto);
    await this.repo.save(tag);
    return { success: true, data: tag };
  }

  async findAll() {
    const tags = await this.repo.find();
    return { success: true, data: tags };
  }

  async findOne(id: number) {
    const tag = await this.repo.findOneBy({ id });
    if (!tag) throw new NotFoundException('Tag not found');
    return { success: true, data: tag };
  }

  async update(id: number, dto: UpdateBlogTagDto) {
    const tag = await this.repo.findOneBy({ id });
    if (!tag) throw new NotFoundException('Tag not found');
    const updated = this.repo.merge(tag, dto);
    await this.repo.save(updated);
    return { success: true, data: updated };
  }

  async remove(id: number) {
    const tag = await this.repo.findOneBy({ id });
    if (!tag) throw new NotFoundException('Tag not found');
    await this.repo.remove(tag);
    return { success: true, message: 'Tag deleted' };
  }
}
