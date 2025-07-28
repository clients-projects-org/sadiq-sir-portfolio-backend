import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { NewsletterSubscriberService } from './newsletter-subscriber.service';
import { CreateNewsletterSubscriberDto } from './dto/create-newsletter-subscriber.dto';
import { UpdateNewsletterSubscriberDto } from './dto/update-newsletter-subscriber.dto';
import { AuthGuard } from 'src/helper/auth-guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('newsletter-subscribers')
export class NewsletterSubscriberController {
  constructor(private readonly service: NewsletterSubscriberService) {}

  @Post()
  create(@Body() dto: CreateNewsletterSubscriberDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNewsletterSubscriberDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
