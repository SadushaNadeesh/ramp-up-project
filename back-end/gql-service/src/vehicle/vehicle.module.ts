import { Module } from '@nestjs/common';
import { VehicleResolver } from './vehicle.resolver';
import { VehicleService } from './vehicle.service';

@Module({
  providers: [VehicleService, VehicleResolver],
  exports:[VehicleService]
})
export class VehicleModule {}
