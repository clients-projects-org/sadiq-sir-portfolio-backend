import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/helper/auth-guard/auth.guard';
import { UploadService } from '../upload/upload.service';
import { AboutMeService } from './about-me.service';
import { CreateAboutMeDto } from './dto/create-about-me.dto';
import { UpdateAboutMeDto } from './dto/update-about-me.dto';

@UseGuards(AuthGuard)
@Controller('about-me')
export class AboutMeController {
  constructor(
    private readonly aboutMeService: AboutMeService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseInterceptors(
    new UploadService().createMultiFieldUploadInterceptor({
      fieldNames: ['images[0]', 'images[1]'],
      destination: './uploads/about-me',
    }),
  )
  create(
    @UploadedFiles()
    files: {
      'images[0]'?: Express.Multer.File[];
      'images[1]'?: Express.Multer.File[];
    },
    @Body() createAboutMeDto: CreateAboutMeDto,
  ) {
    createAboutMeDto.image1 = files['images[0]']?.[0]?.filename;
    createAboutMeDto.image2 = files['images[1]']?.[0]?.filename;

    return this.aboutMeService.create(createAboutMeDto);
  }

  @Patch(':id')
  @UseInterceptors(
    new UploadService().createMultiFieldUploadInterceptor({
      fieldNames: ['images[0]', 'images[1]'],
      destination: './uploads/about-me',
    }),
  )
  update(
    @Param('id') id: string,
    @UploadedFiles()
    files: {
      'images[0]'?: Express.Multer.File[];
      'images[1]'?: Express.Multer.File[];
    },
    @Body() updateAboutMeDto: UpdateAboutMeDto,
  ) {
    if (files['images[0]']?.[0]) {
      updateAboutMeDto.image1 = files['images[0]'][0].filename;
    }

    if (files['images[1]']?.[0]) {
      updateAboutMeDto.image2 = files['images[1]'][0].filename;
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
