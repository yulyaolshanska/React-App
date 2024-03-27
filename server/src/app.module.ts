import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskList } from './task-list/entities/task-list.entity';
import { TaskListModule } from './task-list/task-list.module';
import { config as dotenvConfig } from 'dotenv';
import { TaskHistoryModule } from './task-history/task-history.module';
import { TaskModule } from './tasks/tasks.module';

dotenvConfig({ path: '.env' });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'example',
      database: 'postgres',
      // entities: [TaskList],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TaskListModule,
    TaskModule,
    TaskHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
