import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/helper/auth-guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Get(':id')
  get(@Param('id') id: number): Promise<User | null> {
    return this.userService.findOne(id);
  }
  @Post()
  create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() user: User): Promise<User> {
    user.id = Number(id);
    return this.userService.update(user);
  }
  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
