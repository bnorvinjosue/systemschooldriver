import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/config/database/database.service';
@Injectable()
export class LogClassService {
    private c:string = "students";
constructor(private readonly ds: DatabaseService){

}
insertLog(key:string, data:any){
  return this.ds.appendObject(this.c, key, 'logclass',data);
}
removeLog(key:string, number:string){
  return this.ds.removeObject(this.c, key, 'logclass', number);
}
getAll(key:string){
 return this.ds.getAllObject(this.c, key, 'logclass')
}
getOne(key:string, index:number){
return this.ds.getOneByIndexArray(this.c, key, "logclass", index);
}

}
