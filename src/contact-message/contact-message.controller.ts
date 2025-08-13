import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/helper/auth-guard/auth.guard';
import { ContactMessageService } from './contact-message.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';

@Controller('contact-messages')
export class ContactMessageController {
  constructor(private readonly service: ContactMessageService) {}

  @Post()
  create(@Body() dto: CreateContactMessageDto) {
    return this.service.create(dto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.service.findAll();
  }
}
