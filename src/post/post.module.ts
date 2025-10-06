import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostEntity } from '../entities/post.entity';
import { UserEntity } from '../entities/user.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity]), forwardRef(() => UserModule)],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
