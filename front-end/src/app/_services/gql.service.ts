import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { gql, Apollo } from 'apollo-angular';

const getAllCars = gql`
query{
  getAllVehicle{
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
`;

const deleteCarById = gql`
mutation($vId:Int!){
  removeVehicle(vId: $vId) {
    id
    firstName
    lastName
    email
    carMake
    carModel
  }
}
`;

// const updateCar = gql`
// mutation (
//   $id:Int!
//       $firstName:String!
//       $lastName:String!
//       $carMake:String!
//       $carModel:String!
//       $email:String!
//       $vinNumber:String!
//       $manufacturedDate:String!
//       $vehicleAge:Int!
//   ){
//     updateVehicle(
//     vehicle: {id: $id, firstName: $firstName, lastName: $lastName, carMake: $carMake, carModel: $carModel, email: $email,  vinNumber: $vinNumber,  manufacturedDate: $manufacturedDate,  vehicleAge: $vehicleAge}
//   ) {
//     id
//     firstName
//     lastName
//     email
//     carMake
//     carModel
//     vinNumber
//     manufacturedDate
//     vehicleAge
  
// }}`

const updateCar = gql`
mutation ($updateVehicle: UpdateVehicleInput!){
  updateVehicle(updateVehicle:$updateVehicle) {
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
}`

const createCar = gql`
mutation ($createVehicleInput: CreateVehicleInput!){
  createVehicle(createVehicleInput:$createVehicleInput) {
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
}`

const getACar = gql`
query($vId:Int!){
  vehicle(vId: $vId) {
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
`;

@Injectable({
  providedIn: 'root'
})
export class GqlService {

  constructor(private http: HttpClient, private apollo: Apollo) { }

  getAllVehicles() {
    return this.apollo.watchQuery<any>({
      query: getAllCars
    }).valueChanges
  }

  getVehicleById(vId: number) {
    return this.apollo.watchQuery<any>({
      query: getACar,
      variables: {
        vId: Number(vId)
      }
    }).valueChanges
  }

  updateVehicle(id: number, vehicle: any) {
    console.log("............"+vehicle.id);
    return this.apollo.mutate({
      mutation: updateCar,
      variables:{
        updateVehicle: {
          vId: Number(vehicle.id),
          id: Number(vehicle.id),
          firstName: vehicle.first_name,
          lastName: vehicle.last_name,
          email: vehicle.email,
          carMake: vehicle.car_make,
          carModel: vehicle.car_model,
          vinNumber: vehicle.vin_number,
          manufacturedDate: vehicle.manufactured_date,
          vehicleAge: 0,
        }
      }
    });

  }

  addVehicle(vehicle: any) {
    console.log("............"+vehicle.id);
    return this.apollo.mutate({
      mutation: createCar,
      variables:{
        createVehicleInput: {
          id: Number(vehicle.id),
          firstName: vehicle.first_name,
          lastName: vehicle.last_name,
          email: vehicle.email,
          carMake: vehicle.car_make,
          carModel: vehicle.car_model,
          vinNumber: vehicle.vin_number,
          manufacturedDate: vehicle.manufactured_date,
          vehicleAge: 0,
        }
      }
    });

  }

  delete(vId: any) {
    console.log(vId);
    return this.apollo.mutate({
      mutation: deleteCarById,
      variables: {
        vId: vId
      }
    })
  }
}
