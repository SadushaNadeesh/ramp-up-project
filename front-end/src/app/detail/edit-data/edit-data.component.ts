import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GqlService } from 'src/app/_services/gql.service';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.scss']
})
export class EditDataComponent implements OnInit {

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

  currentData: any;
  message = '';

  submitted = false;
  status = 'AVAILABLE'
  cr_date: any = new Date();
  isLoggedIn = false;

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: GqlService
  ) { }

  ngOnInit(): void {
    this.message = '';
    const id = this.route.snapshot.paramMap.get('id');
    this.getData(id);
  }

  getData(vid: any) {
    this.vehicleService.getVehicleById(vid)
      .subscribe(({ data, loading }) => {
        console.log(data.vehicle);
        this.currentData = data.vehicle;
      })
  }

  updateData(data: NgForm) {

    this.vehicleService.updateVehicle(this.currentData.id, data.value)
      .subscribe(({ data }) => {
        this.message = 'The Data updated successfully!';
        console.log(data);
      }, error => {
        console.log(error);
      })
  }

}
