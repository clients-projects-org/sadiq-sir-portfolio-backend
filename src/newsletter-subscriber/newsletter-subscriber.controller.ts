import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/helper/auth-guard/auth.guard';
import { CreateNewsletterSubscriberDto } from './dto/create-newsletter-subscriber.dto';
import { NewsletterSubscriberService } from './newsletter-subscriber.service';

@Controller('newsletter-subscribers')
export class NewsletterSubscriberController {
  constructor(private readonly service: NewsletterSubscriberService) {}

  @Post()
  create(@Body() dto: CreateNewsletterSubscriberDto) {
    return this.service.create(dto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.service.findAll();
  }
}
