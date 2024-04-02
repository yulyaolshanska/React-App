import {
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Priority } from '../../constants/enums/priority.enum';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  position: number;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  created_at: Date;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  columnId: number;

  @ApiProperty({ enum: Priority })
  @IsOptional()
  @IsEnum(Priority)
  priority: Priority;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  due_date: Date;
}

export class UpdateTaskDto extends CreateTaskDto {}
