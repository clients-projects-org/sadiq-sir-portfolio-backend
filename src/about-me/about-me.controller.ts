import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AboutMeService } from './about-me.service';
import { CreateAboutMeDto } from './dto/create-about-me.dto';
import { UpdateAboutMeDto } from './dto/update-about-me.dto';
import { UploadService } from '../upload/upload.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('about-me')
export class AboutMeController {
  constructor(
    private readonly aboutMeService: AboutMeService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseInterceptors(
    new UploadService().createUploadInterceptor({
      fieldName: 'images',
      destination: './uploads/about-me',
      multiple: true,
      maxFiles: 2,
    }),
  )
  create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createAboutMeDto: CreateAboutMeDto,
  ) {
    if (files?.length) {
      createAboutMeDto.image1 = files[0]?.filename;
      createAboutMeDto.image2 = files[1]?.filename;
    }
    return this.aboutMeService.create(createAboutMeDto);
  }

  @Patch(':id')
  @UseInterceptors(
    new UploadService().createUploadInterceptor({
      fieldName: 'images',
      destination: './uploads/about-me',
      multiple: true,
      maxFiles: 2,
    }),
  )
  update(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() updateAboutMeDto: UpdateAboutMeDto,
  ) {
    if (files?.length) {
      updateAboutMeDto.image1 = files[0]?.filename;
      updateAboutMeDto.image2 = files[1]?.filename;
    }
    return this.aboutMeService.update(+id, updateAboutMeDto);
  }

  @Get()
  findAll() {
    return this.aboutMeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aboutMeService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aboutMeService.remove(+id);
  }
}
