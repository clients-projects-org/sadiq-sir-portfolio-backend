// database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CustomConfigService } from 'src/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [CustomConfigService],
      useFactory: (config: CustomConfigService) => ({
        type: config.dbType as keyof TypeOrmModuleOptions['type'],
        host: config.host,
        port: config.dbPort,
        username: config.dbUsername,
        password: config.dbPassword,
        database: config.dbName,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
  ],
  providers: [CustomConfigService], // Make sure the service is available
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
