import { IsString, IsNotEmpty, IsOptional, IsDate } from 'class-validator';

export class CreateStudent {
  @IsString()
  @IsNotEmpty()
  documentID: string;

  @IsString()
  @IsNotEmpty()
  typeOfID: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsDate()
  @IsOptional()
  dateOfBirth?: Date;
}