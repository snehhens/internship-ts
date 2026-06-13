import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(): boolean {

    const token =
      localStorage.getItem('token');

    const profileCompleted =
      localStorage.getItem('profileCompleted');

    if (!token) {

      this.router.navigate(['/login']);

      return false;

    }

    if (profileCompleted === 'true') {

      this.router.navigate(['/home']);

      return false;

    }

    return true;

  }

}