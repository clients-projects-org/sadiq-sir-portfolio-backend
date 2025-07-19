import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsletterSubscriber } from './entities/newsletter-subscriber.entity';
import { CreateNewsletterSubscriberDto } from './dto/create-newsletter-subscriber.dto';
import { UpdateNewsletterSubscriberDto } from './dto/update-newsletter-subscriber.dto';

@Injectable()
export class NewsletterSubscriberService {
  constructor(
    @InjectRepository(NewsletterSubscriber)
    private readonly repo: Repository<NewsletterSubscriber>,
  ) {}

  async create(dto: CreateNewsletterSubscriberDto) {
    const exists = await this.repo.findOneBy({ email: dto.email });
    if (exists) throw new ConflictException('Email is already subscribed');

    const sub = this.repo.create(dto);
    await this.repo.save(sub);
    return { success: true, message: 'Subscribed successfully', data: sub };
  }

  async findAll() {
    const list = await this.repo.find({ order: { subscribedAt: 'DESC' } });
    return { success: true, data: list };
  }

  async findOne(id: number) {
    const sub = await this.repo.findOneBy({ id });
    if (!sub) throw new NotFoundException('Subscriber not found');
    return { success: true, data: sub };
  }

  async update(id: number, dto: UpdateNewsletterSubscriberDto) {
    const sub = await this.repo.findOneBy({ id });
    if (!sub) throw new NotFoundException('Subscriber not found');

    const updated = this.repo.merge(sub, dto);
    await this.repo.save(updated);
    return { success: true, data: updated };
  }

  async remove(id: number) {
    const sub = await this.repo.findOneBy({ id });
    if (!sub) throw new NotFoundException('Subscriber not found');
    await this.repo.remove(sub);
    return { success: true, message: 'Subscriber removed' };
  }
}
