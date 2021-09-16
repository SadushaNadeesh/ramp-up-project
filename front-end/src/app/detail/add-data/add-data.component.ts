import { Component, OnInit } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { Vehicle } from 'src/app/models/data';

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

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {
  allGadets:Vehicle[] = [];
  selectedBrand:string = '';

  vehicleForm = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    car_make: '',
    car_model: '',
    vin_number: '',
    manufactured_date: '',
    vehicle_age: 0
  };
  submitted = false;
  status = 'AVAILABLE'
  cr_date: any = new Date();
  isLoggedIn = false;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
  }

  addData() {
    this.apollo.mutate({
      mutation: Add,
      variables: {
        // CreateVehicleInput: {
          id: Number(this.vehicleForm.id),
          firstName: this.vehicleForm.first_name,
          lastName: this.vehicleForm.last_name,
          email: this.vehicleForm.email,
          carMake: this.vehicleForm.car_make,
          carModel: this.vehicleForm.car_model,
          vinNumber: this.vehicleForm.vin_number,
          manufacturedDate: this.vehicleForm.manufactured_date,
          vehicleAge: 0,
        // }
      }
    })
    .subscribe(({ data }) => {
      console.log(data);
      this.submitted = true;
    })
  }


  newData(): void {
    this.submitted = false;
    this.vehicleForm = {
      id: 0,
      first_name: '',
      last_name: '',
      email: '',
      car_make: '',
      car_model: '',
      vin_number: '',
      manufactured_date: '',
      vehicle_age: 0
    };
  }

}
