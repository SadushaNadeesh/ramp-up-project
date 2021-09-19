import { Module } from '@nestjs/common';
import { SocketclusterService } from 'src/socketcluster/socketcluster.service';
import { VehicleModule } from 'src/vehicle/vehicle.module';
import { ExportController } from './export.controller';
import { ExportService } from './export.service';

@Module({
  imports:[VehicleModule],
  controllers: [ExportController],
  providers: [ExportService,SocketclusterService]
})
export class ExportModule {}
