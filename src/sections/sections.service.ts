import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Section } from './entities/section.entity';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Section)
    private sectionRepository: Repository<Section>,
  ) {}

  async create(createDto: CreateSectionDto) {
    const section = this.sectionRepository.create(createDto);
    await this.sectionRepository.save(section);
    return { success: true, message: 'Section created', data: section };
  }

  async findAll() {
    const sections = await this.sectionRepository.find();
    return { success: true, data: sections };
  }

  async findOne(id: number) {
    const section = await this.sectionRepository.findOneBy({ id });
    if (!section) throw new NotFoundException('Section not found');
    return { success: true, data: section };
  }

  async findByKey(key: string) {
    const section = await this.sectionRepository.findOneBy({ key });
    if (!section)
      throw new NotFoundException(`Section with key "${key}" not found`);

    return { success: true, data: section };
  }

  async update(id: number, updateDto: UpdateSectionDto) {
    const section = await this.sectionRepository.findOneBy({ id });
    if (!section) throw new NotFoundException('Section not found');

    const updated = this.sectionRepository.merge(section, updateDto);
    await this.sectionRepository.save(updated);
    return { success: true, message: 'Section updated', data: updated };
  }

  async remove(id: number) {
    const section = await this.sectionRepository.findOneBy({ id });
    if (!section) throw new NotFoundException('Section not found');

    await this.sectionRepository.remove(section);
    return { success: true, message: 'Section deleted' };
  }
}
