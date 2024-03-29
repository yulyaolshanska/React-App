import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class CreateTaskListDto {
  @Column()
  @ApiProperty()
  title: string;

  @Column({ nullable: true })
  @ApiProperty()
  position: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  created_at: Date;

  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty()
  updated_at: Date;
}
