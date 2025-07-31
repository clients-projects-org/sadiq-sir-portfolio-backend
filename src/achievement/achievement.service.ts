import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadService } from '../upload/upload.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { Achievement } from './entities/achievement.entity';

@Injectable()
export class AchievementService {
  constructor(
    @InjectRepository(Achievement)
    private repo: Repository<Achievement>,
    private readonly uploadService: UploadService,
  ) {}

  private getImageUrl(filename?: string): string | null {
    if (!filename) return null;
    return `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/achievements/${filename}`;
  }

  async create(dto: CreateAchievementDto) {
    const record = this.repo.create(dto);
    await this.repo.save(record);
    return {
      success: true,
      message: 'Achievement created successfully',
      data: {
        ...record,
        imageUrl: this.getImageUrl(record.image),
      },
    };
  }

  async findAll() {
    const list = await this.repo.find();
    return {
      success: true,
      data: list.map((item) => ({
        ...item,
        imageUrl: this.getImageUrl(item.image),
      })),
    };
  }

  async findOne(id: number) {
    const record = await this.repo.findOneBy({ id });
    if (!record) throw new NotFoundException('Achievement not found');
    return {
      success: true,
      data: {
        ...record,
        imageUrl: this.getImageUrl(record.image),
      },
    };
  }

  async update(id: number, dto: UpdateAchievementDto) {
    const record = await this.repo.findOneBy({ id });
    if (!record) throw new NotFoundException('Achievement not found');

    if (dto.image && record.image) {
      this.uploadService.deleteFile(record.image, 'achievements');
    }

    const updated = this.repo.merge(record, dto);
    await this.repo.save(updated);

    return {
      success: true,
      message: 'Achievement updated successfully',
      data: {
        ...updated,
        imageUrl: this.getImageUrl(updated.image),
      },
    };
  }

  async remove(id: number) {
    const record = await this.repo.findOneBy({ id });
    if (!record) throw new NotFoundException('Achievement not found');

    if (record.image)
      this.uploadService.deleteFile(record.image, 'achievements');

    await this.repo.remove(record);
    return { success: true, message: 'Achievement deleted successfully' };
  }
}
