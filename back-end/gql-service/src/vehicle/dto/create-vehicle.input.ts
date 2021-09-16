import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateVehicleInput {

  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  carMake: string;

  @Field()
  carModel: string;

  @Field()
  vinNumber: string;

  @Field()
  manufacturedDate: string;

  @Field(() => Int)
  vehicleAge: number;
}
