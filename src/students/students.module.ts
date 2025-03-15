import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { DatabaseModule } from 'src/config/database/database.module';
import { LogClassModule } from './log-class/log-class.module';
import { TestModule } from './test/test.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule, LogClassModule, TestModule, JwtModule],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
