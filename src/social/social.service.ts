import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Social } from './entities/social.entity';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';

@Injectable()
export class SocialService {
  constructor(
    @InjectRepository(Social)
    private readonly socialRepo: Repository<Social>,
  ) {}

  async create(dto: CreateSocialDto) {
    const social = this.socialRepo.create(dto);
    await this.socialRepo.save(social);
    return { success: true, data: social };
  }

  async findAll() {
    const socials = await this.socialRepo.find();
    return { success: true, data: socials };
  }

  async findOne(id: number) {
    const social = await this.socialRepo.findOneBy({ id });
    if (!social) throw new NotFoundException('Social not found');
    return { success: true, data: social };
  }

  async update(id: number, dto: UpdateSocialDto) {
    const social = await this.socialRepo.findOneBy({ id });
    if (!social) throw new NotFoundException('Social not found');
    const updated = this.socialRepo.merge(social, dto);
    await this.socialRepo.save(updated);
    return { success: true, data: updated };
  }

  async remove(id: number) {
    const social = await this.socialRepo.findOneBy({ id });
    if (!social) throw new NotFoundException('Social not found');
    await this.socialRepo.remove(social);
    return { success: true, message: 'Social deleted' };
  }

  async changeStatus(id: number, status: 'active' | 'inactive') {
    const social = await this.socialRepo.findOneBy({ id });
    if (!social) throw new NotFoundException('Social not found');
    social.status = status;
    await this.socialRepo.save(social);
    return { success: true, data: social };
  }
}
