import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { getConnection, Repository } from 'typeorm';

//Producer
@Injectable()
export class ImportJobService {
    constructor(
        @InjectQueue('import-csv-data-queue') private queue: Queue,
        @InjectRepository(Vehicle) private readonly dataRepo: Repository<Vehicle>
    ) { }

    async importData(data: string) {
        await this.queue.add('data-job', {
            fileName: data
        }, { delay: 5000 });
    }

    async create(data: any[]) {
        const vehicles = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Vehicle)
            .values(data)
            .execute();
    }
}
