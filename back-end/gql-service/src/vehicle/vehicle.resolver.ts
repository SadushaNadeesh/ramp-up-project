import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';

@Resolver(() => Vehicle)
export class VehicleResolver {

    constructor(private readonly vehicleService: VehicleService) { }

    @Mutation(() => Vehicle, { name: 'createVehicle' })
    createVehicle(@Args('createVehicleInput') createVehicleInput: CreateVehicleInput) {
        return this.vehicleService.create(createVehicleInput);
    }

    @Query(() => [Vehicle], { name: 'getAllVehicle' })
    findAll() {
        return this.vehicleService.findAll();
    }

    @Query(() => Vehicle, { name: 'vehicle' })
    findOne(@Args('id', { type: () => Int }) vId: number) {
        return this.vehicleService.findOne(vId);
    }

    @Mutation(() => Vehicle, { name: 'updateVehicle' })
    updateVehicle(@Args('updateVehicle') updateVehicle: UpdateVehicleInput) {
        return this.vehicleService.update(updateVehicle.vId, updateVehicle);
    }

    @Mutation(() => Vehicle)
    removeVehicle(@Args('id', { type: () => Int }) vId: number) {
        return this.vehicleService.remove(vId);
    }

    @Query(() => [Vehicle], { name: "paginated" })
    paginateVehicles(@Args('offSet') offset: number, @Args('first') first: number) {
        return this.vehicleService.paginate(first, offset);
    }

    // @Query(() => [Vehicle], { name: "ageOfVehicle" })
    // ageOfVehicle(@Args('higher') higher: number, @Args('lower') lower: number) {
    //     return this.vehicleService.ageOfVehicle(higher, lower);
    // }

}
