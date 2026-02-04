import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { ListUsersDto } from './dto/list-users.dto';
import { EditUserDto } from './dto/edit-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userData: UserEntity) {
    const salt = await bcrypt.genSalt();

    const passwordHash = await bcrypt.hash(userData.password, salt);

    const newUser = this.userRepository.create({
      ...userData,
      password: passwordHash,
    });

    await this.userRepository.save(newUser);
  }

  async listUsers() {
    const users = await this.userRepository.find();
    const usersList = users.map((user) => new ListUsersDto(user.id, user.username, user.profile));

    return usersList;
  }

  async searchUser(query: string) {
    const posts = await this.userRepository.find({
      where: [
        { username: ILike(`%${query}%`) },
        { email: ILike(`%${query}%`) },
        { profile: ILike(`%${query}%`) },
      ],
    });

    return posts.map((user) => new ListUsersDto(user.id, user.username, user.profile));
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findById(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async editUser(id: string, userDto: EditUserDto) {
    await this.userRepository.update(id, userDto);
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id);
  }
}
