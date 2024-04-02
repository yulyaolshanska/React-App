import { ApiProperty } from '@nestjs/swagger';
import { Priority } from '../../constants/enums/priority.enum';

export class TaskDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  position: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  columnId: number;

  @ApiProperty({ nullable: true })
  priority: Priority;

  @ApiProperty({ nullable: true })
  due_date: Date;
}
