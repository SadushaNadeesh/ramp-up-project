
import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FileReadService } from '../_services/file-read.service';
import { FileUploadService } from '../_services/file-upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  post = {
    file: ''
  };

  name:string[]=[];

  existingFile: any;
  filename = '';

  submitted = false;
  teacher_id = '';
  isLoggedIn = false;
  user_id: number = 1;
  status = 'PENDING'
  cr_date: any = new Date();
  fileToUpload: any;

  constructor(private fileUpload: FileUploadService, private readFile: FileReadService) { }

  ngOnInit(): void {
  }

  chooseFile(event: any): void {
    this.existingFile = event.target.files[0];
    // console.log(this.existingFile);

    this.fileUpload.uploadFile(this.existingFile).subscribe(data => {
      // if (event instanceof HttpResponse) {
      //   // this.msg = event.body.message;
      //   //this.FileDetail = this.fileUpload.getFiles();
      //   // console.log(event.filepath);
      // }
      console.log(data.file);
      this.filename = data.file;
    }, (error) => {
      // this.msg = 'Error occured while uploading file';
      console.log(error);
      this.existingFile = undefined;
    });
  }

  saveTutorial(): void {
    const data = {
      file: this.filename,
    };

    this.name = this.filename.split('\\');
    // console.log(typeof this.post.file);
    console.log(this.name[1]);

    this.readFile.create(this.name[1].split('.')[0])
      .subscribe(
        response => {
          console.log(response.data);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newTutorial(): void {
    this.submitted = false;
    this.post = {
      file: ''
    };
  }

}
