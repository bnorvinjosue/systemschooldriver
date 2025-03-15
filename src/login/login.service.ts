import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dtos/login-user.dto';
import { UserService } from './user/user.service'; // Importa UserService

@Injectable()
export class LoginService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  async loginUser({ username, password }: LoginUserDto) {
    const isEmail = /\S+@\S+\.\S+/.test(username);
    if (isEmail) {
      return this.loginByEmail(username, password);
    }
    return this.loginByUsername(username, password);
  }

  async loginByField(field: string, value: string, password: string) {
    const user = await this.userService.findUserByField(field, value);
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    if (!user.secretWord) {
      await this.userService.generateAndSetSecretWord(user.username);
      const updatedUser = await this.userService.findUserByField(field, value);
      user.secretWord = updatedUser.secretWord;
    }
    const payload = { email: user.email };
    const token = await this.jwtService.sign(payload, { secret: user.secretWord });
    return {
      token: token,
      email: user.email,
    };
  }

  async loginByUsername(username: string, password: string) {
    return this.loginByField('username', username, password);
  }

  async loginByEmail(email: string, password: string) {
    return this.loginByField('email', email, password);
  }
}