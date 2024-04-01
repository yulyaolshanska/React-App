import { ApiProperty } from '@nestjs/swagger';

export class TaskHistoryDto {
  @ApiProperty({ nullable: true })
  id: number;

  @ApiProperty({ nullable: true })
  description: string;

  @ApiProperty({ nullable: true })
  created_at: Date;

  @ApiProperty({ nullable: true })
  task_id: number;
}
