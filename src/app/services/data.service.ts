import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // private url = 'https://api-gcevs.tech/voting';
  // private url = 'http://localhost/voting-api';
  private url = 'https://gordoncollegeccs.edu.ph/prj/election/api';

  apiRequest(method: any, data: any) {
    return this.http.post(this.url + method, data)
  }
}
