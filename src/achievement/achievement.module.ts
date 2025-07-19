import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';
import { Achievement } from './entities/achievement.entity';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Achievement]), UploadModule],
  controllers: [AchievementController],
  providers: [AchievementService],
})
export class AchievementModule {}
