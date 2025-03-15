import { Controller, Get, Put, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('students')
export class StudentsController {
    constructor(private readonly ss: StudentsService) {}

    @Get()
    @UseGuards(AuthGuard)
    getAll() {
        // Implementation for getting all students
       return this.ss.getAllStudents();
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
       return this.ss.getStudentById(id)
    }

    @Post()
    insertStudent(@Body() studentDto: any) {
        return this.ss.createStudent(studentDto);
    }

    @Put(':id')
    updateStudent(@Param('id') id: string, @Body() studentDto: any) {
        // Implementation for updating a student by id
        return id;
    }

    @Delete(':id')
    removeStudent(@Param('id') id: string) {
        // Implementation for removing a student by id
        return id;
    }
}
