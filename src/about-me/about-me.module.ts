import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutMeService } from './about-me.service';
import { AboutMeController } from './about-me.controller';
import { AboutMe } from './entities/about-me.entity';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([AboutMe]), UploadModule],
  controllers: [AboutMeController],
  providers: [AboutMeService],
})
export class AboutMeModule {}
