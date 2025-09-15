import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module.js';
import { PostModule } from './post/post.module.js';

@Module({
  imports: [UserModule, PostModule],
})
export class AppModule {}
