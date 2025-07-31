import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadService } from '../upload/upload.service';
import { CreateAboutMeDto } from './dto/create-about-me.dto';
import { UpdateAboutMeDto } from './dto/update-about-me.dto';
import { AboutMe } from './entities/about-me.entity';

@Injectable()
export class AboutMeService {
  constructor(
    @InjectRepository(AboutMe)
    private aboutMeRepository: Repository<AboutMe>,
    private readonly uploadService: UploadService,
  ) {}

  private getImageUrl(filename?: string): string | null {
    if (!filename) return null;
    return `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/about-me/${filename}`;
  }

  async create(createDto: CreateAboutMeDto) {
    const about = this.aboutMeRepository.create(createDto);
    await this.aboutMeRepository.save(about);
    return {
      success: true,
      message: 'AboutMe created successfully',
      data: {
        ...about,
        image1Url: this.getImageUrl(about.image1),
        image2Url: this.getImageUrl(about.image2),
      },
    };
  }

  async findAll() {
    const list = await this.aboutMeRepository.find();
    return {
      success: true,
      data: list.map((item) => ({
        ...item,
        image1Url: this.getImageUrl(item.image1),
        image2Url: this.getImageUrl(item.image2),
      })),
    };
  }

  async findOne(id: number) {
    const about = await this.aboutMeRepository.findOneBy({ id });
    if (!about) throw new NotFoundException('AboutMe not found');
    return {
      success: true,
      data: {
        ...about,
        image1Url: this.getImageUrl(about.image1),
        image2Url: this.getImageUrl(about.image2),
      },
    };
  }

  async update(id: number, updateDto: UpdateAboutMeDto) {
    const about = await this.aboutMeRepository.findOneBy({ id });
    if (!about) throw new NotFoundException('AboutMe not found');

    // Delete old images if new ones are uploaded
    if (updateDto.image1 && about.image1) {
      this.uploadService.deleteFile(about.image1, 'about-me');
    }
    if (updateDto.image2 && about.image2) {
      this.uploadService.deleteFile(about.image2, 'about-me');
    }

    const updated = this.aboutMeRepository.merge(about, updateDto);
    await this.aboutMeRepository.save(updated);
    return {
      success: true,
      message: 'AboutMe updated successfully',
      data: {
        ...updated,
        image1Url: this.getImageUrl(updated.image1),
        image2Url: this.getImageUrl(updated.image2),
      },
    };
  }

  async remove(id: number) {
    const about = await this.aboutMeRepository.findOneBy({ id });
    if (!about) throw new NotFoundException('AboutMe not found');

    if (about.image1) this.uploadService.deleteFile(about.image1, 'about-me');
    if (about.image2) this.uploadService.deleteFile(about.image2, 'about-me');

    await this.aboutMeRepository.remove(about);
    return { success: true, message: 'AboutMe deleted successfully' };
  }
}
