import { Injectable } from '@nestjs/common';
import { BannerService } from '../banner/banner.service';
import { AboutMeService } from '../about-me/about-me.service';
import { SectionsService } from '../sections/sections.service';
import { ResearchService } from '../research/research.service';
import { EventService } from '../event/event.service';
import { AchievementService } from '../achievement/achievement.service';
import { GalleryService } from '../gallery/gallery.service';
import { BlogService } from '../blog/blog.service';
import { SocialService } from '../social/social.service';

@Injectable()
export class FrontendService {
  constructor(
    private readonly bannerService: BannerService,
    private readonly aboutMeService: AboutMeService,
    private readonly sectionsService: SectionsService,
    private readonly researchService: ResearchService,
    private readonly eventService: EventService,
    private readonly achievementService: AchievementService,
    private readonly galleryService: GalleryService,
    private readonly blogService: BlogService,
    private readonly socialService: SocialService,
  ) {}

  async getAllContent() {
    const banners = await this.bannerService.findAll();
    const aboutMe = await this.aboutMeService.findAll();
    const sections = await this.sectionsService.findAll();
    const research = await this.researchService.findAll();
    const events = await this.eventService.findAll();
    const achievements = await this.achievementService.findAll();
    const galleries = await this.galleryService.findAll();
    const blogs = await this.blogService.findAll();
    const socials = await this.socialService.findAll();

    return {
      banners,
      aboutMe,
      sections,
      research,
      events,
      achievements,
      galleries,
      blogs,
      socials,
    };
  }
}
