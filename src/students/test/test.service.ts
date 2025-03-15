import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/config/database/database.service';
import { GetRamdomQuestion } from 'src/query/queries/queries.helper';

@Injectable()
export class TestService {
    constructor(private readonly dbs: DatabaseService){}

    async setQuestion(Types: string[]){
        let questions: any[] = [];
        questions = questions.concat(await this.dbs.executeAQL(GetRamdomQuestion(), { type: "Ley 431" }));
        questions = questions.concat(await this.dbs.executeAQL(GetRamdomQuestion(), { type: "Señales de Tránsito" }));
      
        for (const type of Types) {
          let questionCount = type.length === 1? 15 : Math.floor(15 / type.length);// Cantidad de preguntas basada en el tipo
          //contar las preguntas cuando sea el ultimo tipo
            if (type === Types[Types.length - 1]) {
                questionCount = 25-questions.length;
            }
          const typeQuestions = await this.dbs.executeAQL(GetRamdomQuestion(questionCount), { type });
          questions.push(...typeQuestions); // Usamos spread para añadir múltiples elementos
        }
        
        //revolver las preguntas
        questions = questions.sort(() => Math.random() - 0.5);
        return questions;
    }
}
