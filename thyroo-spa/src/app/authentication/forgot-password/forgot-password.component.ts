import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, retryWhen, delayWhen } from 'rxjs/operators';
import { throwError, timer } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  emailAddress: string;
  loader: boolean;
  requestSent: boolean;
  requestFailed: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  public requestForgotPassword(email: string): void {
    this.loader = true;
    this.authService.forgotPassword(email).pipe(
      catchError(err => {
        this.loader = false;
        this.requestFailed = true;
        return throwError(err);
      })
    ).subscribe(response => {
      this.loader = false;
      if (response) {
        this.requestSent = true;
        this.requestFailed = false;
        this.emailAddress = '';
      }
    }, err => {
      console.log(err);
      this.loader = false;
      this.requestFailed = true;
    });
  }
}
