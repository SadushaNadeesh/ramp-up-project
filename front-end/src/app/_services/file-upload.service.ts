import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const endpoint = 'http://localhost:3001/api/csv';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private httpClient: HttpClient) { }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    // const request = new HttpRequest('POST', `${this.endpoint}/${id}/cover`, formData, {
    //   //reportProgress: true,
    //   responseType: 'json'
    // });

      //return this.httpClient.post(request);
    const res = this.httpClient.post(`${endpoint}/upload`, formData);
    return res;
  }

  getFiles(): Observable<any> {
    return this.httpClient.get(`${endpoint}/change-to-json`);
  }
}
