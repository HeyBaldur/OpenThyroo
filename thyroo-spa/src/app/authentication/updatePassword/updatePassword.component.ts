import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-updatePassword',
  templateUrl: './updatePassword.component.html',
  styleUrls: ['./updatePassword.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  
  newPassword: string;
  loader: boolean;
  requestSent: boolean;
  requestFailed: boolean;
  
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(routeParams => {
      console.log(routeParams.token);
    });
  }

  public updatePassword(password: string): void {
    this.loader = true;
    const token = this.activatedRoute.snapshot.params.token;
    this.authService.updatePassword(token, password).pipe(
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
        this.newPassword = '';
      }
    }, err => {
      console.log(err);
      this.loader = false;
      this.requestFailed = true;
    });
  }

}
