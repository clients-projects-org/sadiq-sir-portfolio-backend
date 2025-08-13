import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AboutMeModule } from './about-me/about-me.module';
import { AchievementModule } from './achievement/achievement.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BannerModule } from './banner/banner.module';
import { BlogCategoryModule } from './blog-category/blog-category.module';
import { BlogModule } from './blog/blog.module';
import { CustomConfigModule } from './config';
import { ContactMessageModule } from './contact-message/contact-message.module';
import { ContactModule } from './contact/contact.module';
import { DatabaseModule } from './database/database.module';
import { EventModule } from './event/event.module';
import { FrontendModule } from './frontend/frontend.module';
import { GalleryCategoryModule } from './gallery-category/gallery-category.module';
import { GalleryModule } from './gallery/gallery.module';
import { JwtGlobalModule } from './helper';
import { NewsletterSubscriberModule } from './newsletter-subscriber/newsletter-subscriber.module';
import { ResearchModule } from './research/research.module';
import { SectionsModule } from './sections/sections.module';
import { SocialModule } from './social/social.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', // URL prefix
    }),
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
    SocialModule,
    ContactModule,
    ContactMessageModule,
    NewsletterSubscriberModule,
    FrontendModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
