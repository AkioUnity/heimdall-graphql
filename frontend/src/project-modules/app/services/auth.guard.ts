import { Router, CanActivate, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public router: Router) { }

  canActivate(): boolean {

    if (!this.isAuthenticated()) this.router.navigate(['/home']);
    else return true;
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('id') && localStorage.getItem('token') && localStorage.getItem('token') !== undefined) return true;
    else return false;
  }
}
