import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/users/interfaces/user';
import { UserService } from 'src/app/users/services/user.service';
import { catchError, retryWhen, delayWhen } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { timer } from 'rxjs/internal/observable/timer';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';


@Component({
  selector: 'app-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.css']
})
export class UserProfileCardComponent implements OnInit {

  @Input() userId: number;
  profile: User;
  loader: boolean;
  currentUserFlag: boolean;

  constructor(
    private userService: UserService,
    private localStrategyService: LocalStrategyService) { }

  ngOnInit() {
    const currentUserId = this.localStrategyService.getUserId();
    if (this.userId === currentUserId) {
      this.currentUserFlag = true;
    }
    this.getProfile(this.userId);
  }

  public getProfile(userToQuery: number): void {
    this.loader = true;
    this.userService.getUserDetails(userToQuery)
      .pipe(
        catchError(err => {
          this.loader = false;
          console.log('Error :', err);
          return throwError(err);
        }),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(300))
        ))
      ).subscribe(response => {
        // Main variables
        this.loader = false;
        this.profile = response;
      }, error => {
        this.loader = false;
        console.log(error);
      });
  }
}
