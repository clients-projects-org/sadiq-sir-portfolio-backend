import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactMessage } from './entities/contact-message.entity';
import { ContactMessageService } from './contact-message.service';
import { ContactMessageController } from './contact-message.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContactMessage])],
  providers: [ContactMessageService],
  controllers: [ContactMessageController],
})
export class ContactMessageModule {}
