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
      host: `${process.env.DATABASE_HOST}`,
      port: 5432,
      username: `${process.env.DATABASE_USERNAME}`,
      password: 'prostoparol',
      database: `${process.env.DATABASE_NAME}`,
      entities: [],
      synchronize: true,
    }),
    // TaskListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
