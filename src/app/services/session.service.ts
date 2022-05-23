import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  decodeToken(data: any) {
    var base64ToParse = atob(data);
    return JSON.parse(base64ToParse);
  }

  encodeData(data: any) {
    var JSONToString = JSON.stringify(data);
    var base64ToEncode = btoa(JSONToString);
    return base64ToEncode;
  }

  decodeData(data: any) {
    var base64ToParse = atob(data);
    return JSON.parse(base64ToParse);
  }

  uploadToSession(data: any) {
    sessionStorage.setItem('raw', data);
  }

  getSessionData() {
    return sessionStorage.getItem('raw');
  }

  deleteData() {
    sessionStorage.removeItem("raw");
  }

  searchSessionId() {
    return sessionStorage.getItem('id');
  }
  
}
