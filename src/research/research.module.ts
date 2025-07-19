import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResearchService } from './research.service';
import { ResearchController } from './research.controller';
import { Research } from './entities/research.entity';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Research]), UploadModule],
  controllers: [ResearchController],
  providers: [ResearchService],
})
export class ResearchModule {}
