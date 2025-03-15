import { IsString, IsOptional, IsDate } from 'class-validator';

export class UpdateStudentDto {
  @IsString()
  @IsOptional()
  documentID?: string;

  @IsString()
  @IsOptional()
  typeOfID?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsDate()
  @IsOptional()
  dateOfBirth?: Date;
}