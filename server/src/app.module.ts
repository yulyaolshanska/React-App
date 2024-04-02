import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskListModule } from './task-list/task-list.module';
import { config as dotenvConfig } from 'dotenv';
import { TaskHistoryModule } from './task-history/task-history.module';
import { TaskModule } from './tasks/tasks.module';

dotenvConfig({ path: '.env' });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_URL,
      host: `${process.env.DATABASE_HOST}`,
      port: +`${process.env.DATABASE_PORT}`,
      username: `${process.env.DATABASE_USERNAME}`,
      password: `${process.env.DATABASE_PASSWORD}`,
      database: `${process.env.DATABASE_NAME}`,
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
