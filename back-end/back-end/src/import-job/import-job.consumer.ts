import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

const csvParser = require('csv-parser')
import * as fs from 'fs';
import { ImportJobService } from "./import-job.service";
let results = [];

function ageDifference(dt: number) {
    var d1 = new Date();
    var d2 = new Date(dt);
    var diff = d1.getTime() - d2.getTime();

    var daydiff = diff / (1000 * 60 * 60 * 24);
    var yeardiff = (diff / 31536000000).toFixed(0);
    return parseInt(yeardiff);
}

@Processor('import-csv-data-queue')
export class CsvConsumer {

    constructor(private readonly dataService: ImportJobService) { }

    @Process('data-job')
    async readOperationJob(job: Job<unknown>) {
        let name: any = job.data;
        console.log('success');
        this.readCsvFile(name.fileName);
    }

    readCsvFile(fileName) {

        let csv = csvParser({ separator: "," })
        fs.createReadStream(`uploads/${fileName}.csv`)
            .pipe(csv)
            .on('data', async function (row) {
                let age = ageDifference(row.manufactured_date);
    
                let vehicle = {
                    id: parseInt(row.id),
                    firstName: row.first_name,
                    lastName: row.last_name,
                    email: row.email,
                    carMake: row.car_make,
                    carModel: row.car_model,
                    vinNumber: row.vin_number,
                    manufacturedDate: row.manufactured_date,
                    vehicleAge: age
                }
                
                results.push(vehicle);
            })
            .on('end', async () => {
                console.log(results);
                try {
                    await this.dataService.create(results);
                } catch (error) {
                    console.log(error);
                }
            });
    }

}