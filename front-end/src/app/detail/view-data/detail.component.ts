import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { gql, Apollo } from 'apollo-angular';
import { Vehicle } from 'src/app/models/data';

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
}`;

const Remove_Vehicle = gql`
mutation($id:Int!){
  deleteVehicleByVId(input:{vId:$id}){
    vehicle{
      vId
      firstName
    }
  }
}`;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  vehicles: Vehicle[] = [];
  vehicleId: number = 0;

  v:any[] = [];

  constructor(private router: Router,private apollo: Apollo) { }

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(){
    this.apollo.watchQuery<any>({
      query: Get_Vehicles
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        console.log(data);
        this.vehicles = data.allVehicles.nodes;
      })
  }

  removeVehicle(vid: number) {
    console.log(vid);
    this.vehicles=[];
    this.apollo.mutate<any>({
      mutation: Remove_Vehicle,
      variables: {
        id: vid
      }
    }).subscribe(({ data }) => {
      this.loadAllData();
      console.log(data.deleteVehicleByVId);
    }, error => {
      console.log(error);
    });
    
  }

  addNew() {
    this.router.navigateByUrl('/add-data');
  }

}
