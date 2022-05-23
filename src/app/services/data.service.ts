import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost/voting-api';

  apiRequest(method: any, data: any) {
    return this.http.post(this.url + method, data)
  }
}
