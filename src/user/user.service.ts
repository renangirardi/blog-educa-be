import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { ListUsersDto } from './dto/list-users.dto';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userData: UserEntity) {
    await this.userRepository.save(userData);
  }

  async listUsers() {
    const users = await this.userRepository.find();
    const usersList = users.map((user) => new ListUsersDto(user.id, user.username, user.profile));

    return usersList;
  }

  async editUser(id: string, userDto: EditUserDto) {
    await this.userRepository.update(id, userDto);
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id);
  }
}
