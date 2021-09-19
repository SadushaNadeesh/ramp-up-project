import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3001/api/csv/change-to-json';
const baseUrl2 = 'http://localhost:3001/api/import-job';
const baseUrl3 = 'http://localhost:3000/export';

@Injectable({
  providedIn: 'root'
})
export class FileReadService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl2, {data:data});
  }

  export(higher: number,lower:number): Observable<any> {
    return this.http.post(baseUrl3, {
      higher,
      lower
    });
  }

}