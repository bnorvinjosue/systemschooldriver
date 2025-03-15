import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { DatabaseModule } from './config/database/database.module';
import { StudentsModule } from './students/students.module';
import { UsersModule } from './users/users.module';
import { TestModule } from './students/test/test.module';


@Module({
  imports: [LoginModule, DatabaseModule, StudentsModule, ConfigModule.forRoot(), 
    UsersModule, TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
