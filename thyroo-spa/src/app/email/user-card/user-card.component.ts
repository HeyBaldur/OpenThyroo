import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/users/services/user.service';
import { catchError, takeUntil, retryWhen, delayWhen } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { throwError, timer } from 'rxjs';
import { User } from 'src/app/users/interfaces/user';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit, OnDestroy {

  // Public variables
  @Input() userId: number;
  @Output() username: EventEmitter<string> = new EventEmitter<string>();
  @Output() isMatch: EventEmitter<boolean> = new EventEmitter<boolean>();
  profile: User;
  loader: boolean;
  isError: boolean;

  // On destroy observable
  private onDestroy$ = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private localStrategy: LocalStrategyService) { }

  ngOnDestroy(): void {
    this.onDestroy$.next(false);
  }

  ngOnInit(
  ) {
    this.route.params.subscribe(routeParams => {
      this.getProfile(routeParams.id);
    });
  }

  public getProfile(userId: number): void {
    this.loader = true;
    this.userService.getUserDetails(userId)
      .pipe(
        catchError(err => {
          console.log('Error :', err);
          return throwError(err);
        }),
        takeUntil(this.onDestroy$)
      ).subscribe(response => {

        // Main variables
        this.profile = response;

        // Validate match
        this.validateMatch(response.id);

        // Set username
        this.username.emit(`To: ${response.knowAs}`);
        console.log(response);
        this.loader = false;
      }, error => {
        console.log(error);
        this.loader = false;
        this.isError = true;
      });
  }

  public validateMatch(targetBusinessProfileId: number): void {
    this.loader = true;
    const currentProfileId = this.localStrategy.getBusinessProfileId();
    this.userService.validateMatch(currentProfileId, targetBusinessProfileId)
    .pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      }),
      retryWhen(errors => errors.pipe(
        delayWhen(() => timer(300))
      ))
    )
    .subscribe(res => {
      this.isMatch.emit(res.matched);
      this.loader = false;
    }, error => {
      console.error(error);
      this.loader = false;
    });
  }
}
