import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/global.service';
import { User } from 'src/app/core/interfaces/user';
import { catchError, retryWhen, delayWhen } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { timer } from 'rxjs';

@Component({
  selector: 'app-users-block',
  templateUrl: './users-block.component.html',
  styleUrls: ['./users-block.component.css']
})
export class UsersBlockComponent implements OnInit {

  users: User[];
  public skeleton: boolean;
  constructor(private globalService: GlobalService) { }

  ngOnInit() {
    this.getUsers();
  }

  public getUsers(): void {
    this.skeleton = true;
    this.globalService.getLatestUsers()
      .pipe(
        catchError(err => {
          this.skeleton = false;
          return throwError(err);
        }),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(300))
        ))
      )
      .subscribe(res => {
        this.skeleton = false;
        this.users = res;
      });
  }
}
