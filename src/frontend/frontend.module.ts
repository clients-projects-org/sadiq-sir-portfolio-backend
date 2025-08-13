import { Module } from '@nestjs/common';
import { FrontendController } from './frontend.controller';
import { FrontendService } from './frontend.service';

// Import all necessary modules' services
import { ContactModule } from 'src/contact/contact.module';
import { GalleryCategoryModule } from 'src/gallery-category/gallery-category.module';
import { AboutMeModule } from '../about-me/about-me.module';
import { AchievementModule } from '../achievement/achievement.module';
import { BannerModule } from '../banner/banner.module';
import { BlogModule } from '../blog/blog.module';
import { EventModule } from '../event/event.module';
import { GalleryModule } from '../gallery/gallery.module';
import { ResearchModule } from '../research/research.module';
import { SectionsModule } from '../sections/sections.module';
import { SocialModule } from '../social/social.module';

@Module({
  imports: [
    AboutMeModule,
    AchievementModule,
    BannerModule,
    SectionsModule,
    BlogModule,
    ContactModule,
    ResearchModule,
    EventModule,
    GalleryModule,
    GalleryCategoryModule,
    SocialModule,
  ],
  controllers: [FrontendController],
  providers: [FrontendService],
})
export class FrontendModule {}
