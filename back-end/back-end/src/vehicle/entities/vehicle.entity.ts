import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('vehicle')
export class Vehicle {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  vId: number;

  @Field(() => Int)
  @Column()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  carMake: string;

  @Field()
  @Column()
  carModel: string;

  @Field()
  @Column()
  vinNumber: string;

  @Field()
  @Column()
  manufacturedDate: string;

  @Field(() => Int)
  @Column()
  vehicleAge: number;

}
