import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import UserProfile from '../enum/user-profile-enum';
import { UserService } from './user.service';
import { EditUserDto } from './dto/edit-user.dto';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    const user = new UserEntity();
    user.username = userData.username;
    user.email = userData.email;
    user.password = userData.password;
    user.profile = userData.profile;

    if (!Object.values(UserProfile).includes(userData.profile)) {
      throw new Error('Invalid user profile');
    }

    const createdUser = await this.userService.createUser(user);

    return {
      message: 'User created successfully',
      user: createdUser,
    };
  }

  @Get()
  async getUsers() {
    return this.userService.listUsers();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    return user;
  }

  @Patch('/:id')
  async editUser(@Param('id') id: string, @Body() userData: EditUserDto) {
    const editedUser = await this.userService.editUser(id, userData);
    return {
      message: 'User edited successfully',
      post: editedUser,
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.userService.deleteUser(id);
    return {
      message: 'User deleted successfully',
      post: deletedUser,
    };
  }
}
