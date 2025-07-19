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
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UploadService } from '../upload/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('events')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseInterceptors(
    new UploadService().createUploadInterceptor({
      fieldName: 'image',
      destination: './uploads/events',
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateEventDto,
  ) {
    if (file) dto.image = file.filename;
    return this.eventService.create(dto);
  }

  @Patch(':id')
  @UseInterceptors(
    new UploadService().createUploadInterceptor({
      fieldName: 'image',
      destination: './uploads/events',
    }),
  )
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdateEventDto,
  ) {
    if (file) dto.image = file.filename;
    return this.eventService.update(+id, dto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
