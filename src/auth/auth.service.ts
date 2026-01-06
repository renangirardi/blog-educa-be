import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // 1. Busca o usuário pelo email (Você precisa ter esse método no UsersService)
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // 2. Compara a senha enviada com a senha hash do banco
    // CUIDADO: user.password deve ser o hash salvo no banco
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // 3. Retorna o usuário (sem a senha)
    // Opcional: Aqui você poderia retornar um JWT, mas para seu frontend atual,
    // retornar o objeto do usuário já basta para criar a sessão no Next.js
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user; // Remove a senha do retorno
    return result;
  }
}
