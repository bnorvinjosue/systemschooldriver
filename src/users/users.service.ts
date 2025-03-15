import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  loginUser(username: string, password: string){
    //verificar si es correo o es username
    const isEmail = /\S+@\S+\.\S+/.test(username);
    if (isEmail) {
      return `Logging in with email: ${username}`;
    } else {
      return `Logging in with username: ${username}`;
    }
  }
}
