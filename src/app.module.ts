import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PostgresConfigService } from './config/postgres.config.service.js';
import { UserModule } from './user/user.module.js';
import { PostModule } from './post/post.module.js';
import { AuthModule } from './auth/auth.module';
import { SeedService } from './database/seed.service';
import { UserEntity } from './entities/user.entity.js';

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
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
  ],
  providers: [SeedService],
})
export class AppModule {}
