import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { SocialService } from './social.service';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';

@Controller('socials')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Post()
  create(@Body() dto: CreateSocialDto) {
    return this.socialService.create(dto);
  }

  @Get()
  findAll() {
    return this.socialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSocialDto) {
    return this.socialService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socialService.remove(+id);
  }

  // Status change endpoint
  @Patch(':id/status/:status')
  changeStatus(
    @Param('id') id: string,
    @Param('status') status: 'active' | 'inactive',
  ) {
    return this.socialService.changeStatus(+id, status);
  }
}
