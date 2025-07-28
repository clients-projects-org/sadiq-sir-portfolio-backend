import { Module } from '@nestjs/common';
import { FrontendController } from './frontend.controller';
import { FrontendService } from './frontend.service';

// Import all necessary modules' services
import { BannerModule } from '../banner/banner.module';
import { AboutMeModule } from '../about-me/about-me.module';
import { SectionsModule } from '../sections/sections.module';
import { ResearchModule } from '../research/research.module';
import { EventModule } from '../event/event.module';
import { AchievementModule } from '../achievement/achievement.module';
import { GalleryModule } from '../gallery/gallery.module';
import { BlogModule } from '../blog/blog.module';
import { SocialModule } from '../social/social.module';
import { ContactModule } from 'src/contact/contact.module';

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
    SocialModule,
  ],
  controllers: [FrontendController],
  providers: [FrontendService],
})
export class FrontendModule {}
