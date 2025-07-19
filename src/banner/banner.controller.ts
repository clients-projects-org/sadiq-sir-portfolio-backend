import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { UploadService } from '../upload/upload.service';

@Controller('banners')
export class BannerController {
  constructor(
    private readonly bannerService: BannerService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseInterceptors(
    new UploadService().createUploadInterceptor({
      fieldName: 'image',
      destination: './uploads/banners',
    }),
  )
  create(
    @Body() createBannerDto: CreateBannerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      createBannerDto.imagePath = file.filename;
    }
    return this.bannerService.create(createBannerDto);
  }

  @Patch(':id')
  @UseInterceptors(
    new UploadService().createUploadInterceptor({
      fieldName: 'image',
      destination: './uploads/banners',
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateBannerDto: UpdateBannerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      updateBannerDto.imagePath = file.filename;
    }
    return this.bannerService.update(+id, updateBannerDto);
  }

  @Get()
  findAll() {
    return this.bannerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannerService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannerService.remove(+id);
  }
}
