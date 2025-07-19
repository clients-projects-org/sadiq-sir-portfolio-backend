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
import { ResearchService } from './research.service';
import { CreateResearchDto } from './dto/create-research.dto';
import { UpdateResearchDto } from './dto/update-research.dto';
import { UploadService } from '../upload/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('research')
export class ResearchController {
  constructor(
    private readonly researchService: ResearchService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseInterceptors(
    new UploadService().createUploadInterceptor({
      fieldName: 'image',
      destination: './uploads/research',
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateResearchDto,
  ) {
    if (file) dto.image = file.filename;
    return this.researchService.create(dto);
  }

  @Patch(':id')
  @UseInterceptors(
    new UploadService().createUploadInterceptor({
      fieldName: 'image',
      destination: './uploads/research',
    }),
  )
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdateResearchDto,
  ) {
    if (file) dto.image = file.filename;
    return this.researchService.update(+id, dto);
  }

  @Get()
  findAll() {
    return this.researchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.researchService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.researchService.remove(+id);
  }
}
