import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor() { }

  getToken() {
    return !!sessionStorage.getItem('raw');
  }

}
