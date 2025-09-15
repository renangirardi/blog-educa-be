import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserEntity } from './user.entity.js';
import { v4 as uuid } from 'uuid';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  createUser(@Body() userData: CreateUserDto) {
    const user = new UserEntity();
    user.id = uuid();
    user.username = userData.username;
    user.email = userData.email;
    user.password = userData.password;

    this.userRepository.createUser(user);
    return {
      message: 'User created successfully',
    };
  }

  @Get()
  getUsers() {
    return this.userRepository.getUsers();
  }
}
