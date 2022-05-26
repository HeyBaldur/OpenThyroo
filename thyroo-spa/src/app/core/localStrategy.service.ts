import { Injectable } from '@angular/core';
import { User } from './interfaces/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LocalStrategyService {

  currentUser: User;
  jwtHelper = new JwtHelperService();
  constructor(private httpClient: HttpClient) { }

  public getUserId(): any {
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.nameid;
  }

  public getCurrentUser(): User {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    return this.currentUser;
  }

  public getBusinessProfileId(): number {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    return this.currentUser.businessId;
  }

  public updateCurrentUser(): void {
    const userId = this.getUserId();
    this.httpClient.post<any>(`${environment.baseUrl}auth/updateCurrentUser/${userId}`, {}).subscribe(response => {
      localStorage.removeItem('user'); // Remove current user
      localStorage.setItem('user', JSON.stringify(response.user)); // Set new user
    });
  }
}
