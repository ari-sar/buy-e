import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    return localStorage.getItem('hasLoggedIn') === 'true';
  }

  login() {
    localStorage.setItem('hasLoggedIn', 'true');
  }

  logout() {
    localStorage.removeItem('hasLoggedIn');
  }
}
