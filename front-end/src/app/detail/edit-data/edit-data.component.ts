import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { gql, Apollo } from 'apollo-angular';

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

const Get_Data = gql`
query($id:Int!){
  vehicleByVId(vId: $id) {
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

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.scss']
})
export class EditDataComponent implements OnInit {

  // vehicleForm = {
  //   id: 0,
  //   first_name: '',
  //   last_name: '',
  //   email: '',
  //   car_make: '',
  //   car_model: '',
  //   vin_number: '',
  //   manufactured_date: '',
  //   vehicle_age: 0
  // };

  currentData: any;
  message = '';

  submitted = false;
  status = 'AVAILABLE'
  cr_date: any = new Date();
  isLoggedIn = false;

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.message = '';
    const id = this.route.snapshot.paramMap.get('id');
    this.getData(id);
  }

  getData(vid: any) {
    this.apollo.watchQuery<any>({
      query: Get_Data,
      variables: {
        id: Number(vid)
      }
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        console.log(data.vehicle);
        this.currentData = data.vehicleByVId;
      }, error => {
        console.log(error);
      });
  }

  updateData(data:any) {
    this.apollo.mutate({
      mutation: Update_Data,
      variables: {
        // UpdateVehicleInput: {
          vId:Number(data.id),
          id: Number(data.id),
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          carMake: data.car_make,
          carModel: data.car_model,
          vinNumber: data.vin_number,
          manufacturedDate: data.manufactured_date,
          vehicleAge: 0,
        // }
      }
    }).subscribe(({ data }) => {
      this.message = 'The Data updated successfully!';
      console.log(data);
    }, error => {
      console.log(error);
    })
  }

}
