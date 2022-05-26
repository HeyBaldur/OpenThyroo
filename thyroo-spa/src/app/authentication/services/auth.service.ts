// Core imports
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Firebase dependencies
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserToSignIn, SignInCredentials, SignUpCredentials } from '../interfaces/userToSignIn';
import { UserDto } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Private variables
  user: User;

  // Public variables
  userToSignIn: UserToSignIn;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private httpClient: HttpClient) {
  }

  // Sign in with Google
  public googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  public async authLogin(provider: auth.AuthProvider) {
    try {
      const result = await this.afAuth.auth.signInWithPopup(provider);
      const userToStore: UserDto = result.user;

      // Set information from gmail
      this.userToSignIn = {
        email: userToStore.email,
        uid: userToStore.uid,
        photoUrl: userToStore.photoURL,
        providerFullName: userToStore.displayName
      };

      // Sign in with backend
      if (result !== null) {
        this.signInWithGoogle(this.userToSignIn).subscribe(response => {
          if (response !== null) {
            console.log(response);
            localStorage.setItem('token', response.token);
            localStorage.setItem('currentUser', JSON.stringify(userToStore));
            localStorage.setItem('userEmail', userToStore.email);
            localStorage.setItem('userId', userToStore.uid);
            localStorage.setItem('user', JSON.stringify(response.user));
            // Redirect to authed page
            this.router.navigateByUrl('feed');
          }
        }, err => {
          console.error('An unexpected error has ocurred, please try again');
          console.error(err);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  signInWithGoogle(userToSignIn: UserToSignIn): Observable<any> {
    return this.httpClient.post<any>(`${environment.baseUrl}auth/authWithProvider`, userToSignIn);
  }

  signInToDatabase(userToSignIn: SignInCredentials): Observable<any> {
    return this.httpClient.post<any>(`${environment.baseUrl}auth/signin`, userToSignIn);
  }

  signUpToDatabase(userToSignUp: SignUpCredentials): Observable<any> {
    return this.httpClient.post<any>(`${environment.baseUrl}auth/signup`, userToSignUp);
  }

  forgotPassword(email: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${environment.baseUrl}auth/forgotPassword/${email}`, {});
  }

  updatePassword(token: string, password: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${environment.baseUrl}auth/changePassword/${token}/${password}`, {});
  }
}
