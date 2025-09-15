import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity.js';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  createUser(userData: UserEntity) {
    this.users.push(userData);
    return userData;
  }

  getUsers() {
    return this.users;
  }
}
