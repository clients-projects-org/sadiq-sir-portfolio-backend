import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogTag } from './entities/blog-tag.entity';
import { BlogTagService } from './blog-tag.service';
import { BlogTagController } from './blog-tag.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BlogTag])],
  providers: [BlogTagService],
  controllers: [BlogTagController],
  exports: [BlogTagService],
})
export class BlogTagModule {}
