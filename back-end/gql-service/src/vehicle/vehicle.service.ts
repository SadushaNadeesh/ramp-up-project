import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { request } from 'graphql-request';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { gql } from 'apollo-server-express';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehicleService {

  private endpoint = "http://localhost:5000/graphql";

  constructor() { }

  async create(vehicle: CreateVehicleInput): Promise<Vehicle> {
    console.log(vehicle.firstName);
    const Add = gql`
    mutation(
      $id:Int!
      $firstName:String!
      $lastName:String!
      $carMake:String!
      $carModel:String!
      $email:String!
      $vinNumber:String!
      $manufacturedDate:String!
      $vehicleAge:Int!
      ){
        createVehicle(
          input: {vehicle: {id: $id,firstName: $firstName, lastName: $lastName,carMake: $carMake, carModel:$carModel, email: $email,  vinNumber: $vinNumber,  manufacturedDate: $manufacturedDate,  vehicleAge: $vehicleAge}}
        ) {
        vehicle {
          id
            firstName
            lastName
            email
            carMake
            carModel
            vinNumber
            manufacturedDate
            vehicleAge
        }
      }
    }`;
    const variables = { 
      "id": vehicle.id, "firstName": vehicle.firstName, "lastName": vehicle.lastName, "carMake": vehicle.carMake, 
      "carModel": vehicle.carModel, "email": vehicle.email,  "vinNumber": vehicle.vinNumber,  "manufacturedDate": vehicle.manufacturedDate,  "vehicleAge": vehicle.vehicleAge
      };
    let output = await request(this.endpoint, Add, variables);
    return output.createVehicle;
  }

  async findAll() {
    const Get_Vehicles = gql`
        query{
            allVehicles{
              nodes{
                vId
                id
                firstName
                lastName
                email
                carMake
                carModel
                vinNumber
                manufacturedDate
                vehicleAge
              }
            }
          }`
    let output = await request(this.endpoint, Get_Vehicles);
    return output.allVehicles.nodes;
  }

  async findOne(vId: number): Promise<Vehicle> {
    const Get_Data = gql`
        query($vId:Int!){
            vehicleByVId(vId: $vId) {
              vId
              id
              firstName
              lastName
              email
              carMake
              carModel
              vinNumber
              manufacturedDate
              vehicleAge
            }
        }`;
    const variables = { "vId": vId };
    let output = await request(this.endpoint, Get_Data,variables).then((data) => {
      console.log(data.vehicleByVId);
      return data.vehicleByVId;
    });
    return output;
  }

  async update(id: number, vehicle: UpdateVehicleInput) {
    console.log("......................"+vehicle.firstName);
    const Update_Data = gql`
    mutation(
      $vId:Int!
      $id:Int!
      $firstName:String!
      $lastName:String!
      $carMake:String!
      $carModel:String!
      $email:String!
      $vinNumber:String!
      $manufacturedDate:String!
      $vehicleAge:Int!
      ){
        updateVehicleByVId(
          input:{vId: $vId, vehiclePatch: {vId: $vId, id: $id, firstName: $firstName, lastName: $lastName, carMake: $carMake, carModel: $carModel, email: $email,  vinNumber: $vinNumber,  manufacturedDate: $manufacturedDate,  vehicleAge: $vehicleAge}}
      ) {
        vehicle{
            id
            firstName
            lastName
            email
            carMake
            carModel
            vinNumber
            manufacturedDate
            vehicleAge
        }
      }
    }`;
    const variables = { 
    "vId": vehicle.id, "id": vehicle.id, "firstName": vehicle.firstName, "lastName": vehicle.lastName, "carMake": vehicle.carMake, 
    "carModel": vehicle.carModel, "email": vehicle.email,  "vinNumber": vehicle.vinNumber,  "manufacturedDate": vehicle.manufacturedDate,  "vehicleAge": vehicle.vehicleAge
    };
    // let output = await request(this.endpoint, Update_Data, variables);
    // return output.updateVehicle;
    await request(this.endpoint, Update_Data, variables);

  }

  async remove(vId: number) {
    console.log("...................."+vId);
    const Remove_Vehicle = gql`
        mutation($vId:Int!){
            deleteVehicleByVId(input:{vId:$vId}){
              vehicle{
                vId
                id
                firstName
                lastName
                email
                carMake
                carModel
                vinNumber
                manufacturedDate
                vehicleAge
              }
            }
          }`;
    const variables = { "vId": vId };
    await request(this.endpoint, Remove_Vehicle, variables);
    // return output.deleteVehicleByVId;
    return {
      statusCode: HttpStatus.OK,
      message: 'record removed successfully'
  };
  }

  async paginate(first: number, offset: number) {
    const query = gql`
    query($first: Int!,$offset:Int!){
      allVehicles( first:first offset:offSet  orderBy :MANUFACTURED_DATE_ASC) {
        nodes {
          vId
          id
          firstName
          lastName
          email
          carMake
          carModel
          vinNumber
          manufacturedDate
          vehicleAge
        }
      }
    }`;
    const variables = {
      "first": first,
      "offset": offset
    }

    let output = await request(this.endpoint, query, variables);
    return output.allVehicles;
  }

  async ageOfVehicle(higher: number, lower: number) {
    const query = gql`
    query($higher:Int!, $lower: Int!){
      allVehicles( filter: {
          vehicleAge: {  greaterThanOrEqualTo: $higher lessThanOrEqualTo: $lower  }
        }){
          nodes{
             vId
             id
             firstName
             lastName
             email
             carMake
             carModel
             vinNumber
             manufacturedDate
             vehicleAge
           }
         }
       }`;

       const variables= {
        "higher": higher,
        "lower": lower
       }

    return await request(this.endpoint, query,variables).then((data) => {
      console.log(data.allVehicles.nodes);
      return data;
    });
  }
}
