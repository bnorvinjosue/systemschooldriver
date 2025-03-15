import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { DatabaseModule } from 'src/config/database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from './user/user.service';

@Module({
  providers: [LoginService, UserService],
  controllers: [LoginController],
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('secretWord'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
})
export class LoginModule {}
