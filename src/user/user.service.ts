import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { ListUsersDto } from './dto/list-users.dto';
import { EditUserDto } from './dto/edit-user.dto';
import * as bcrypt from 'bcrypt'; // <--- 1. Importe o bcrypt

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userData: UserEntity) {
    // 2. Gere o "salt" (tempero) da criptografia
    const salt = await bcrypt.genSalt();

    // 3. Crie o Hash da senha
    const passwordHash = await bcrypt.hash(userData.password, salt);

    // 4. Substitua a senha original pelo Hash no objeto que será salvo
    const newUser = this.userRepository.create({
      ...userData,
      password: passwordHash,
    });

    // 5. Salve o usuário com a senha criptografada
    await this.userRepository.save(newUser);
  }

  async listUsers() {
    const users = await this.userRepository.find();
    const usersList = users.map((user) => new ListUsersDto(user.id, user.username, user.profile));

    return usersList;
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
