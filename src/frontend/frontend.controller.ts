import { Controller, Get } from '@nestjs/common';
import { FrontendService } from './frontend.service';

@Controller('frontend')
export class FrontendController {
  constructor(private readonly frontendService: FrontendService) {}

  @Get('all')
  async getAllFrontendContent() {
    return this.frontendService.getAllContent();
  }
}
