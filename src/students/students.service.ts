import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/config/database/database.service';

@Injectable()
export class StudentsService {
    private readonly collection:string = "students";
    constructor(private readonly db: DatabaseService){

    }
    async createStudent(studentData: any): Promise<any> {
        studentData._key = studentData.documentID;
        return await this.db.insert(this.collection, studentData)
    }

    async getAllStudents(): Promise<any[]> {
        return await this.db.getAll(this.collection)
    }

    async getStudentById(id: string): Promise<any> {
        return await this.db.getOne(this.collection, id)
 }

    async updateStudent(id: string, key:string, studentData: any): Promise<any> {
        return await this.db.update(this.collection, key, studentData )
      }

    async deleteStudent(id: number): Promise<any> {
        return await this.db.executeAQL('FOR student IN students FILTER student.id == @id REMOVE student IN students', { id });
    }
}
