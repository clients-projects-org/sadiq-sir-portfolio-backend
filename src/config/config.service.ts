import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class CustomConfigService {
  constructor() {}

  get isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
  }

  get port(): number {
    return process.env.PORT ? Number(process.env.PORT) : 3000;
  }

  get host(): string {
    return process.env.HOST || 'localhost';
  }

  get dbType(): TypeOrmModuleOptions['type'] {
    if (process.env.DB_TYPE as TypeOrmModuleOptions['type']) {
      return process.env.DB_TYPE as TypeOrmModuleOptions['type'];
    }
    return 'mysql';
  }
  get databaseUri(): string {
    return process.env.DATABASE_URI || 'mysql://root@localhost:3306/test';
  }
  get dbUsername(): string {
    return process.env.DB_USERNAME || 'root';
  }

  get dbPassword(): string {
    return process.env.DB_PASSWORD || '';
  }
  get dbPort(): number {
    return process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;
  }

  get dbName(): string {
    return process.env.DB_NAME || 'test';
  }

  get jwtSecret(): string {
    return process.env.JWT_SECRET || 'secret';
  }

  get jwtExpiresIn(): string {
    return process.env.JWT_EXPIRES_IN || '1d';
  }

  get hashSalt(): string {
    return process.env.HASH_SALT || 'salt';
  }

  // Email Configuration
  get email(): string {
    return process.env.EMAIL || 'email';
  }

  get emailPassword(): string {
    return process.env.EMAIL_PASSWORD || 'password';
  }

  get frontEndUrls(): string[] {
    const urls = process.env.FRONTEND_URLS || '';
    return urls ? urls.split(',').map((url) => url.trim()) : [];
  }
}
