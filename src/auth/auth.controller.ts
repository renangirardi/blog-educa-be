import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth') // Isso define o prefixo '/auth'
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') // Isso define o final '/login'. Rota final: POST /auth/login
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.validateUser(loginDto);
  }
}
