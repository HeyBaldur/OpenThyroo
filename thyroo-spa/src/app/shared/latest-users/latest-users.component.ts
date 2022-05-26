import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/interfaces/user';
import { catchError, retryWhen, delayWhen, first, tap, finalize } from 'rxjs/operators';
import { throwError, timer } from 'rxjs';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-latest-users',
  templateUrl: './latest-users.component.html',
  styleUrls: ['./latest-users.component.css']
})
export class LatestUsersComponent implements OnInit {

  users: User[];
  loader: boolean;
  constructor(private globalService: GlobalService) { }

  ngOnInit() {
    this.getUsers();
  }

  public getUsers(): void {
    this.loader = true;
    this.globalService.getLatestUsers()
      .pipe(
        tap(() => console.log('Retreiving information')),
        catchError(err => {
          this.loader = false;
          return throwError(err);
        }),
        finalize(() => console.log('Get done the process')),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(300))
        ))
      )
      .subscribe(res => {
        this.loader = false;
        this.users = res;
        console.log(this.users);
      }, err => {
        console.log(err);
        this.loader = false;
      });
  }
}
