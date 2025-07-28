import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/entities/user.entity';
import { CustomConfigService } from 'src/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private config: CustomConfigService,
  ) {}

  async register(dto: RegisterDto): Promise<User> {
    const hashed = await bcrypt.hash(
      dto.password,
      Number(this.config.hashSalt),
    );

    // Check if user already exists
    const existingUser = await this.userService.findOneByEmail(dto.email);
    if (existingUser) {
      throw new NotFoundException('User already exists');
    }

    // Create new user
    const user = await this.userService.create({ ...dto, password: hashed });
    return user;
  }

  async login(dto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByEmail(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}
