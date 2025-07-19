import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { CustomConfigModule } from './config';
import { JwtGlobalModule } from './helper';
import { BannerModule } from './banner/banner.module';
import { AboutMeModule } from './about-me/about-me.module';
import { SectionsModule } from './sections/sections.module';
import { ResearchModule } from './research/research.module';
import { EventModule } from './event/event.module';
import { AchievementModule } from './achievement/achievement.module';
import { GalleryCategoryModule } from './gallery-category/gallery-category.module';
import { GalleryModule } from './gallery/gallery.module';
import { BlogModule } from './blog/blog.module';
import { BlogCategoryModule } from './blog-category/blog-category.module';
import { BlogTagModule } from './blog-tag/blog-tag.module';
import { SocialModule } from './social/social.module';
import { ContactModule } from './contact/contact.module';
import { ContactMessageModule } from './contact-message/contact-message.module';
import { NewsletterSubscriberModule } from './newsletter-subscriber/newsletter-subscriber.module';

@Module({
  imports: [
    DatabaseModule,
    CustomConfigModule,
    JwtGlobalModule,
    TaskModule,
    UserModule,
    BannerModule,
    AboutMeModule,
    SectionsModule,
    ResearchModule,
    EventModule,
    AchievementModule,
    GalleryCategoryModule,
    GalleryModule,
    BlogModule,
    BlogCategoryModule,
    BlogTagModule,
    SocialModule,
    ContactModule,
    ContactMessageModule,
    NewsletterSubscriberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
