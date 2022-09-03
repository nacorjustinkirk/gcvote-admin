import { AuthGuardService } from '../services/auth-guard.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private AuthGuard: AuthGuardService, private router: Router) { }

  canActivate(): boolean {
    if (!this.AuthGuard.getToken()) {  
        this.router.navigateByUrl("/login");  
    }  
    return this.AuthGuard.getToken();  
  }
  
}
