import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsvConsumer } from './import-job.consumer';
import { ImportJobService } from './import-job.service';
import { ImportJobController } from './import-job.controller';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Vehicle]),
        BullModule.forRoot({
            redis: {
                host: 'localhost',
                port: 5003,
            },
        }),
        BullModule.registerQueue({
            name: 'import-csv-data-queue'
        })
    ],
    controllers: [ImportJobController],
    providers: [ImportJobService, CsvConsumer],
    exports: [ImportJobService]
})
export class ImportJobModule { }
