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
import { AchievementService } from './achievement.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { UploadService } from '../upload/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('achievements')
export class AchievementController {
  constructor(
    private readonly service: AchievementService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseInterceptors(
    new UploadService().createUploadInterceptor({
      fieldName: 'image',
      destination: './uploads/achievements',
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateAchievementDto,
  ) {
    if (file) dto.image = file.filename;
    return this.service.create(dto);
  }

  @Patch(':id')
  @UseInterceptors(
    new UploadService().createUploadInterceptor({
      fieldName: 'image',
      destination: './uploads/achievements',
    }),
  )
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdateAchievementDto,
  ) {
    if (file) dto.image = file.filename;
    return this.service.update(+id, dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
