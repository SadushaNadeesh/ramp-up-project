import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Vehicle } from 'src/app/models/data';
import { GqlService } from 'src/app/_services/gql.service';


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

  constructor(private apollo: Apollo,private vehicleService: GqlService) { }

  ngOnInit(): void {
  }

  addData() {

    this.vehicleService.addVehicle(this.vehicleForm)
      .subscribe(({ data }) => {
        console.log(data);
      this.submitted = true;
      }, error => {
        console.log(error);
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
