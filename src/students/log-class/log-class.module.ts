import { Module } from '@nestjs/common';
import { LogClassService } from './log-class.service';
import { LogClassController } from './log-class.controller';
import { DatabaseModule } from 'src/config/database/database.module';

@Module({
  providers: [LogClassService],
  controllers: [LogClassController],
  imports: [DatabaseModule]
})
export class LogClassModule {}
