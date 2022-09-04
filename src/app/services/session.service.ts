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
    sessionStorage.setItem('raw', data.admintoken_fld);
    sessionStorage.setItem('username', data.adminuser_fld);
    sessionStorage.setItem('userid', data.adminid_fld);
  }

  getSessionData() {
    return sessionStorage.getItem('raw');
  }

  deleteData() {
    sessionStorage.clear();
  }

  searchSessionId() {
    return sessionStorage.getItem('id');
  }  
}
