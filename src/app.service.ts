import { Injectable } from '@nestjs/common';
import { CustomConfigService } from './config';

@Injectable()
export class AppService {
  constructor(private readonly config: CustomConfigService) {}
  getHello(): string {
    const config = this.config;
    const returnConfig = {
      port: config.port,
      host: config.host,
      dbType: config.dbType,
      dbName: config.dbName,
      dbUsername: config.dbUsername,
      dbPassword: config.dbPassword,
      dbPort: config.dbPort,
      databaseUri: config.databaseUri,
      jwtSecret: config.jwtSecret,
      jwtExpiresIn: config.jwtExpiresIn,
      email: config.email,
      emailPassword: config.emailPassword,
      hashSalt: config.hashSalt,
      isDevelopment: config.isDevelopment
        ? "Don't forget. This is development mode"
        : 'This is production mode',
    };
    if (config.isDevelopment) {
      const pretty = JSON.stringify(returnConfig, null, 2);
      return `<pre>${pretty}</pre>`;
    }

    return 'Hello World!';
  }
}
