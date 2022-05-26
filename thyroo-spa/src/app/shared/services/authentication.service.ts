import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

// Shared authenticatio service
export class AuthenticationService {

  // Public variables
  currentUser: User;
  jwtHelper = new JwtHelperService();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router) { }

  public async signOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    await this.afAuth.auth.signOut();
    localStorage.clear();
    // Navigate to the sign in page
    this.router.navigate(['auth/login']);
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const token = localStorage.getItem('token');
    const tokenExpired = this.jwtHelper.isTokenExpired(token);
    return (
      user !== null &&
      token !== null &&
      !tokenExpired);
  }

  getCurrentUser(): User {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    return this.currentUser;
  }

  getToken(): string {
    return localStorage.getItem('token');
  }
}
