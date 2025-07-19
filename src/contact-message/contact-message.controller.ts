import { Controller, Post, Body, Get } from '@nestjs/common';
import { ContactMessageService } from './contact-message.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';

@Controller('contact-messages')
export class ContactMessageController {
  constructor(private readonly service: ContactMessageService) {}

  @Post()
  create(@Body() dto: CreateContactMessageDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
