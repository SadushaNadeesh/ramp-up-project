import { Component, OnInit } from '@angular/core';
import { FileReadService } from '../_services/file-read.service';

@Component({
  selector: 'app-export-data',
  templateUrl: './export-data.component.html',
  styleUrls: ['./export-data.component.scss']
})
export class ExportDataComponent implements OnInit {

  constructor( private readService: FileReadService) { }

  ngOnInit(): void {
    
  }

  sendRequest(){
  }

  export(): void {
    const data = {
      name: "Hello"
    };

    this.readService.export(data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

}
