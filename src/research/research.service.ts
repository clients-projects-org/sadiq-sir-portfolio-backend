import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Research } from './entities/research.entity';
import { CreateResearchDto } from './dto/create-research.dto';
import { UpdateResearchDto } from './dto/update-research.dto';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class ResearchService {
  constructor(
    @InjectRepository(Research)
    private researchRepository: Repository<Research>,
    private readonly uploadService: UploadService,
  ) {}

  private getImageUrl(filename?: string): string | null {
    if (!filename) return null;
    return `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/research/${filename}`;
  }

  async create(createDto: CreateResearchDto) {
    const research = this.researchRepository.create(createDto);
    await this.researchRepository.save(research);
    return {
      success: true,
      message: 'Research created successfully',
      data: {
        ...research,
        imageUrl: this.getImageUrl(research.image),
      },
    };
  }

  async findAll() {
    const list = await this.researchRepository.find();
    return {
      success: true,
      data: list.map((item) => ({
        ...item,
        imageUrl: this.getImageUrl(item.image),
      })),
    };
  }

  async findOne(id: number) {
    const research = await this.researchRepository.findOneBy({ id });
    if (!research) throw new NotFoundException('Research not found');
    return {
      success: true,
      data: {
        ...research,
        imageUrl: this.getImageUrl(research.image),
      },
    };
  }

  async update(id: number, updateDto: UpdateResearchDto) {
    const research = await this.researchRepository.findOneBy({ id });
    if (!research) throw new NotFoundException('Research not found');

    if (updateDto.image && research.image) {
      this.uploadService.deleteFile(research.image);
    }

    const updated = this.researchRepository.merge(research, updateDto);
    await this.researchRepository.save(updated);

    return {
      success: true,
      message: 'Research updated successfully',
      data: {
        ...updated,
        imageUrl: this.getImageUrl(updated.image),
      },
    };
  }

  async remove(id: number) {
    const research = await this.researchRepository.findOneBy({ id });
    if (!research) throw new NotFoundException('Research not found');

    if (research.image) {
      this.uploadService.deleteFile(research.image);
    }

    await this.researchRepository.remove(research);
    return { success: true, message: 'Research deleted successfully' };
  }
}
