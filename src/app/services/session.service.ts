import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  // generateSalt() {
  //   var salt = CryptoJS.lib.WordArray.random(128 / 8);
  //   return CryptoJS.enc.Base64.stringify(salt);
  // }

  // generateToken(data: any) {
  //   var JSONToString = JSON.stringify(data);
  //   var base64ToEncode = btoa(JSONToString);
  //   return base64ToEncode;
  // }

  decodeToken(data: any) {
    var base64ToParse = atob(data);
    return JSON.parse(base64ToParse);
  }

  encodeData(data: any) {
    var JSONToString = JSON.stringify(data);
    sessionStorage.setItem('raw', JSONToString);
  }

  decodeData(data: any) {
    var key: any = sessionStorage.key(1);
    var data: any = sessionStorage.getItem(key);

    var base64ToParse = atob(data);
    var parseToKey = JSON.parse(base64ToParse);
    return JSON.parse(parseToKey);
  }

  deleteData() {
    sessionStorage.removeItem("raw");
  }
  
}
