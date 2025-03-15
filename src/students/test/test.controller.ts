import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('students/test')
export class TestController {
  constructor(private readonly testService: TestService) {}
  @Get()
  index(){
    return "hello";
  }
  @Get('questions')
  question(){
    let type = ["1,2"];
    return this.testService.setQuestion(type);
  }
}
