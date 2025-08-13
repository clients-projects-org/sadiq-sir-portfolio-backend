import { Injectable } from '@nestjs/common';
import { ContactService } from 'src/contact/contact.service';
import { GalleryCategoryService } from 'src/gallery-category/gallery-category.service';
import { AboutMeService } from '../about-me/about-me.service';
import { AchievementService } from '../achievement/achievement.service';
import { BannerService } from '../banner/banner.service';
import { BlogService } from '../blog/blog.service';
import { EventService } from '../event/event.service';
import { GalleryService } from '../gallery/gallery.service';
import { ResearchService } from '../research/research.service';
import { SectionsService } from '../sections/sections.service';
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
    private readonly galleryCategoryService: GalleryCategoryService,
    private readonly blogService: BlogService,
    private readonly socialService: SocialService,
    private readonly contactService: ContactService,
  ) {}

  async getAllContent() {
    const [
      banners,
      aboutMe,
      sections,
      research,
      events,
      achievements,
      galleries,
      galleryCategories,
      blogs,
      socials,
      contacts,
    ] = await Promise.all([
      this.bannerService.findAll(),
      this.aboutMeService.findAll(),
      this.sectionsService.findAll(),
      this.researchService.findAll(),
      this.eventService.findAll(),
      this.achievementService.findAll(),
      this.galleryService.findAll(),
      this.galleryCategoryService.findAllWithCount(),
      this.blogService.findAll(),
      this.socialService.findAll(),
      this.contactService.findAll(),
    ]);

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
      galleryCategories,
      contacts,
    };
  }
}
