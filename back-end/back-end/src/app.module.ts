import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImportJobModule } from './import-job/import-job.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ImportJobModule,
    TypeOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
