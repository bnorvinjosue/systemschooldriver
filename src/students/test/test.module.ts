import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { DatabaseModule } from 'src/config/database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [TestController],
  providers: [TestService],
  imports:[DatabaseModule, JwtModule]
})
export class TestModule {}
