import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadService } from '../upload/upload.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private readonly uploadService: UploadService,
  ) {}

  private getImageUrl(filename?: string): string | null {
    if (!filename) return null;
    return `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/events/${filename}`;
  }

  async create(createDto: CreateEventDto) {
    const event = this.eventRepository.create(createDto);
    await this.eventRepository.save(event);
    return {
      success: true,
      message: 'Event created successfully',
      data: {
        ...event,
        imageUrl: this.getImageUrl(event.image),
      },
    };
  }

  async findAll() {
    const list = await this.eventRepository.find();
    return {
      success: true,
      data: list.map((item) => ({
        ...item,
        imageUrl: this.getImageUrl(item.image),
      })),
    };
  }

  async findOne(id: number) {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) throw new NotFoundException('Event not found');
    return {
      success: true,
      data: {
        ...event,
        imageUrl: this.getImageUrl(event.image),
      },
    };
  }

  async update(id: number, updateDto: UpdateEventDto) {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) throw new NotFoundException('Event not found');

    if (updateDto.image && event.image) {
      this.uploadService.deleteFile(event.image, 'events');
    }

    const updated = this.eventRepository.merge(event, updateDto);
    await this.eventRepository.save(updated);
    return {
      success: true,
      message: 'Event updated successfully',
      data: {
        ...updated,
        imageUrl: this.getImageUrl(updated.image),
      },
    };
  }

  async remove(id: number) {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) throw new NotFoundException('Event not found');

    if (event.image) this.uploadService.deleteFile(event.image, 'events');

    await this.eventRepository.remove(event);
    return { success: true, message: 'Event deleted successfully' };
  }
}
