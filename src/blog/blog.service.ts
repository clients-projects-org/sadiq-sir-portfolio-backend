import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogCategory } from '../blog-category/entities/blog-category.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepo: Repository<Blog>,

    @InjectRepository(BlogCategory)
    private categoryRepo: Repository<BlogCategory>,
  ) {}

  private getImageUrl(filename?: string): string | null {
    if (!filename) return null;
    return `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/blog/${filename}`;
  }

  async create(dto: CreateBlogDto) {
    const category = await this.categoryRepo.findOneBy({ id: dto.categoryId });
    if (!category) throw new NotFoundException('Category not found');

    const blog = this.blogRepo.create({
      ...dto,
      category,
    });
    await this.blogRepo.save(blog);
    return { success: true, data: blog };
  }

  async findAll(
    page = 1,
    limit = 10,
    search?: string,
    status?: 'active' | 'inactive',
  ) {
    const skip = (page - 1) * limit;

    const query = this.blogRepo
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.category', 'category');

    if (search) {
      query.andWhere(
        'blog.title LIKE :search OR blog.shortDescription LIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }

    if (status) {
      query.andWhere('blog.status = :status', { status });
    }

    query.skip(skip).take(limit).orderBy('blog.createdAt', 'DESC');

    const [data, total] = await query.getManyAndCount();

    return {
      success: true,
      data: data.map((item) => ({
        ...item,
        imageUrl: this.getImageUrl(item.image),
      })),
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const blog = await this.blogRepo.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!blog) throw new NotFoundException('Blog not found');
    return { success: true, data: blog };
  }

  async update(id: number, dto: Partial<CreateBlogDto>) {
    const blog = await this.blogRepo.findOneBy({ id });
    if (!blog) throw new NotFoundException('Blog not found');

    if (dto.categoryId) {
      const category = await this.categoryRepo.findOneBy({
        id: dto.categoryId,
      });
      if (!category) throw new NotFoundException('Category not found');
      blog.category = category;
    }

    const updated = this.blogRepo.merge(blog, dto);
    await this.blogRepo.save(updated);
    return { success: true, message: 'Blog updated', data: updated };
  }

  async remove(id: number) {
    const blog = await this.blogRepo.findOneBy({ id });
    if (!blog) throw new NotFoundException('Blog not found');
    await this.blogRepo.remove(blog);
    return { success: true, message: 'Blog deleted' };
  }
}
