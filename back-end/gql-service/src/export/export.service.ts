import { Injectable } from '@nestjs/common';
import { VehicleService } from 'src/vehicle/vehicle.service';

@Injectable()
export class ExportService {
    constructor(){}

    fs = require('fs');
    dir = "./csvExports"
    onModuleInit() {
        if (!this.fs.existsSync(this.dir)) {
            this.fs.mkdirSync(this.dir);
        }
    }

    async saveCsvFile(data): Promise<any> {
        console.log('file saving started');
        const json2csv = require('json2csv');
        return json2csv.parseAsync({
            data: data, fields: [
                'vid',
                'id',
                'firstName',
                'lastName',
                'email',
                'carMake',
                'carModel',
                'vinNumber',
                'manufacturedDate',
                'vehicleAge']
        }).then(csv => {
            this.fs.writeFile(`./csvExports/${Date.now()}.csv`, csv, function (err) {
                if (err) throw err;
                console.log('File Saved!')
            });
        });

    }



}
