import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadService } from '../upload/upload.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Banner } from './entities/banner.entity';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private bannerRepository: Repository<Banner>,
    private readonly uploadService: UploadService,
  ) {}

  async create(createBannerDto: CreateBannerDto) {
    const banner = this.bannerRepository.create(createBannerDto);
    await this.bannerRepository.save(banner);
    return {
      success: true,
      message: 'Banner created successfully',
      data: banner,
    };
  }

  async findAll() {
    const banners = await this.bannerRepository.find();
    return { success: true, data: banners, filedir: '/uploads/banners/' };
  }

  async findOne(id: number) {
    const banner = await this.bannerRepository.findOneBy({ id });
    if (!banner) throw new NotFoundException('Banner not found');
    return { success: true, data: banner, filedir: '/uploads/banners/' };
  }

  async update(id: number, updateBannerDto: UpdateBannerDto) {
    const banner = await this.bannerRepository.findOneBy({ id });
    if (!banner) throw new NotFoundException('Banner not found');

    //   Delete old image if a new one is uploaded
    if (updateBannerDto.imagePath && banner.imagePath) {
      this.uploadService.deleteFile(banner.imagePath, 'banners');
    }

    const updated = this.bannerRepository.merge(banner, updateBannerDto);
    await this.bannerRepository.save(updated);

    return {
      success: true,
      message: 'Banner updated successfully',
      data: updated,
    };
  }

  async remove(id: number) {
    const banner = await this.bannerRepository.findOneBy({ id });
    if (!banner) throw new NotFoundException('Banner not found');

    //   Delete image file
    if (banner.imagePath) {
      this.uploadService.deleteFile(banner.imagePath, 'banners');
    }

    await this.bannerRepository.remove(banner);
    return { success: true, message: 'Banner deleted successfully' };
  }
}
