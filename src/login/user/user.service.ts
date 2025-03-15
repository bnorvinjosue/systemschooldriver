import { Injectable, NotFoundException } from '@nestjs/common';
import { querySetSecretWord, queryGetUser } from 'src/query/queries/queries.helper';
import { DatabaseService } from 'src/config/database/database.service';
import WordsHelper from '../words.helper';

@Injectable()
export class UserService {
  constructor(private readonly dbs: DatabaseService) {}

  async findUserByField(field: string, value: string) {
    const result = await this.dbs.executeAQL(queryGetUser(field), { value });
    if (result.length === 0) {
      throw new NotFoundException(`User with ${field} ${value} not found`);
    }
    return result[0];
  }

  async updateUserSecretWord(username: string, secretWord: string) {
    const result = await this.dbs.executeAQL(querySetSecretWord(), { username, secretWord });
    if (result.length === 0) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return result[0];
  }

  async generateAndSetSecretWord(username: string) {
      const secretWord =  WordsHelper.generateRandomString(35);
      return this.updateUserSecretWord(username, secretWord);
  }
}