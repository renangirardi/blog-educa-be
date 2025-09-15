import { Module } from '@nestjs/common';
import { UserController } from './user.controller.js';
import { UserRepository } from './user.repository.js';

@Module({
  controllers: [UserController],
  providers: [UserRepository],
})
export class UserModule {}
