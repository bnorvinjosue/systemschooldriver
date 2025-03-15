import { Body, Controller, Delete, Param, Post, Get } from '@nestjs/common';
import { LogClassService } from './log-class.service';

@Controller('students/log-class')
export class LogClassController {
    constructor(private readonly sls: LogClassService) {}

    @Get(':key')
    getLog(@Param('key') key: string) {
        return this.sls.getAll(key);
    }

    @Get(':key/:index')
    getLogByIndex(@Param('key') key: string, @Param('index') index: number) {
        return this.sls.getOne(key, index);
    }

    @Post(':key')
    insertLogClass(@Param('key') key:string, @Body() data: any){
       return this.sls.insertLog(key, data);
    }
    @Delete(':key/:index')
    removeLog(@Param('key') key:string, @Param('index') number:string){
        return this.sls.removeLog(key, number);

    }
}
