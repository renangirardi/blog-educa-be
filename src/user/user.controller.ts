/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UserEntity } from '../entities/user.entity';
import UserProfile from '../enum/user-profile-enum';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('/users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  async getMyProfile(@Request() req) {
    return this.userService.findById(req.user.id);
  }

  @Patch('me')
  async updateMyProfile(@Request() req, @Body() userData: EditUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { profile, ...safeData } = userData;

    return this.userService.editUser(req.user.id, safeData);
  }

  @Post()
  @Roles(UserProfile.admin)
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
  @Roles(UserProfile.admin)
  async getUsers() {
    return this.userService.listUsers();
  }

  @Get('/:id')
  @Roles(UserProfile.admin)
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    return user;
  }

  @Get('/search/:query')
  async searchUser(@Param('query') query: string) {
    const searchResult = await this.userService.searchUser(query);
    return searchResult;
  }

  @Patch('/:id')
  @Roles(UserProfile.admin)
  async editUser(@Param('id') id: string, @Body() userData: EditUserDto) {
    const editedUser = await this.userService.editUser(id, userData);
    return {
      message: 'User edited successfully',
      post: editedUser,
    };
  }

  @Delete('/:id')
  @Roles(UserProfile.admin)
  async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.userService.deleteUser(id);
    return {
      message: 'User deleted successfully',
      post: deletedUser,
    };
  }
}
