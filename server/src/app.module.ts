import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskList } from './task-list/entities/task-list.entity';
import { TaskListModule } from './task-list/task-list.module';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: "localhost",
      port: 5432,
      username: 'postgres',
      password: 'prostoparol',
      database: 'postgres',
      entities: [],
      synchronize: true,
    }),
    // TaskListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
