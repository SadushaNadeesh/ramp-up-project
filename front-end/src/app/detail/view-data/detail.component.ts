import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import { Vehicle } from 'src/app/models/data';
import { GqlService } from 'src/app/_services/gql.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  vehicles: Vehicle[] = [];
  vehicleId: number = 0;

  v: any[] = [];

  constructor(private router: Router, private apollo: Apollo, private vehicleService: GqlService) { }

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.vehicleService.getAllVehicles()
      .subscribe(({ data, loading }) => {
        console.log(data);
        console.log(loading);
        this.vehicles = data.getAllVehicle;
      })
  }

  removeVehicle(vid: number) {
    this.vehicleService.delete(vid)
      .subscribe(({ data }) => {
      });
    this.loadAllData();
  }

  addNew() {
    this.router.navigateByUrl('/add-data');
  }

}
