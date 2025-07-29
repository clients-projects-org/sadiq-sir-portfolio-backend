import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomConfigService } from 'src/config';
import { UserService } from 'src/user/user.service';
import { ResponseHelper } from '../response';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly config: CustomConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new HttpException(
        ResponseHelper.error(
          this.config.isDevelopment
            ? 'Authorization header is missing'
            : 'unauthorized.',
        ),
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new HttpException(
        ResponseHelper.error(
          this.config.isDevelopment
            ? 'Token is missing from header'
            : 'unauthorized.',
        ),
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const decoded: any = this.jwtService.verify(token);

      // Check token expiration if needed
      if (decoded.exp * 1000 < Date.now()) {
        throw new HttpException(
          ResponseHelper.error(
            this.config.isDevelopment ? 'Token expired' : 'unauthorized.',
          ),
          HttpStatus.UNAUTHORIZED,
        );
      }

      const user = await this.userService.findOne(decoded._id);

      if (!user) {
        throw new HttpException(
          ResponseHelper.error(
            this.config.isDevelopment ? 'User not found' : 'unauthorized.',
          ),
          HttpStatus.UNAUTHORIZED,
        );
      }

      request.user = user; // attach user to request for further use
      return true; // Allow access
    } catch (error) {
      throw new HttpException(
        ResponseHelper.error(
          this.config.isDevelopment
            ? 'Invalid or expired token'
            : 'unauthorized.',
          null,
          error,
        ),
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
