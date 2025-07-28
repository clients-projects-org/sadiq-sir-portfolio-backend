import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsletterSubscriber } from './entities/newsletter-subscriber.entity';
import { NewsletterSubscriberService } from './newsletter-subscriber.service';
import { NewsletterSubscriberController } from './newsletter-subscriber.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NewsletterSubscriber])],
  controllers: [NewsletterSubscriberController],
  providers: [NewsletterSubscriberService],
  exports: [NewsletterSubscriberService],
})
export class NewsletterSubscriberModule {}
