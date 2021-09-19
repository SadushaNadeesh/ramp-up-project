import { Component, OnInit } from '@angular/core';
import { SocketclientService } from '../socketcluster/socketclient.service';
import { FileReadService } from '../_services/file-read.service';

@Component({
  selector: 'app-export-data',
  templateUrl: './export-data.component.html',
  styleUrls: ['./export-data.component.scss']
})
export class ExportDataComponent implements OnInit {

  constructor( private readService: FileReadService,private socketcluster: SocketclientService) { }

  ngOnInit(): void {
    
  }

  sendRequest(){
  }

  export(): void {
    const data = {
      higher: 39,
      lower: 40
    };

    this.readService.export(data.higher,data.lower)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

}
