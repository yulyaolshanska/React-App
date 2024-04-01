import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class UpdateTaskListDto {
  @Column()
  @ApiProperty()
  title: string;
}
