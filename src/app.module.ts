import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PostgresConfigService } from './config/postgres.config.service.js';
import { UserModule } from './user/user.module.js';
import { PostModule } from './post/post.module.js';

@Module({
  imports: [
    UserModule,
    PostModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
  ],
})
export class AppModule {}
