import { Controller, Get, Query, Res, Body, HttpStatus, Post } from '@nestjs/common';
import { SocketclusterService } from 'src/socketcluster/socketcluster.service';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { ExportService } from './export.service';

@Controller('export')
export class ExportController {

    constructor(private exService: ExportService, private gql: VehicleService, private socketServer:SocketclusterService ) { 
        socketServer.startSocketClusterServer();
    }

    @Post()
    async download(
        @Body('higher') higher: number,
        @Body('lower') lower: number) {
        console.log(higher + "     " + lower);
        const output = await this.gql.ageOfVehicle(higher, lower);
        const csvDone = await this.exService.saveCsvFile(output.allVehicles.nodes);
        var socketServer = this.socketServer;
        await socketServer.sendMessage(csvDone);
        return {
            statusCode: HttpStatus.OK,
            message: 'csv created successfully',
            csvDone
        };
    }

}
