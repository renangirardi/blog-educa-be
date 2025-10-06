import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserService } from './user.service';
import { PostEntity } from '../entities/post.entity';
import { PostModule } from '../post/post.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PostEntity]), forwardRef(() => PostModule)],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
