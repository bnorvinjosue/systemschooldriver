import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginUserDto } from './dtos/login-user.dto';
import { LoginService } from './login.service';
import WordsHelper from './words.helper';

@Controller('login')
export class LoginController {
    constructor(private readonly loginservices: LoginService){}
    @Post()
    handleLoginUser(@Body() user:LoginUserDto){
        return this.loginservices.loginUser(user)
    }
    @Get('word')
    getWord(){
        return WordsHelper.generateRandomString(35)
    }
}
