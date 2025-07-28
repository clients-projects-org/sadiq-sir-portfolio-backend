import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { AuthGuard } from 'src/helper/auth-guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  create(@Body() createDto: CreateSectionDto) {
    return this.sectionsService.create(createDto);
  }

  @Get()
  findAll() {
    return this.sectionsService.findAll();
  }
  @Get('key/:key')
  findByKey(@Param('key') key: string) {
    return this.sectionsService.findByKey(key);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateSectionDto) {
    return this.sectionsService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionsService.remove(+id);
  }
}
