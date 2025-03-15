import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ArangoProvider } from './connection/config';

@Module({
  providers: [DatabaseService, ArangoProvider],
  exports: [DatabaseService, ArangoProvider]
})
export class DatabaseModule {}
