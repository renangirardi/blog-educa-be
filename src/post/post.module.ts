import { Module } from '@nestjs/common';
import { PostController } from './post.controller.js';
import { PostRepository } from './post.repository.js';

@Module({
  controllers: [PostController],
  providers: [PostRepository],
})
export class PostModule {}
