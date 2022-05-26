import { Component, OnInit, OnDestroy } from '@angular/core';
import { BusinessProfile } from '../interfaces/business-profile';
import { ProfileService } from '../services/profile.service';
import { concat, throwError, timer, Subject, of } from 'rxjs';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { catchError, retryWhen, delayWhen, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent implements OnInit, OnDestroy {

  // Public variables
  profile: BusinessProfile;
  errorMessage: string;
  changesApplied: boolean;
  loader: boolean;

  // Error flag
  serverErrorFlag: boolean;

  // On destroy
  private $onDestroy = new Subject<boolean>();

  constructor(
    private profileService: ProfileService,
    private localStrategy: LocalStrategyService) { }

  ngOnDestroy(): void {
    this.$onDestroy.next(false);
  }

  ngOnInit() {
    this.getBusinessProfile();
  }

  // Get business profile
  public getBusinessProfile(): void {
    this.loader = true;
    this.profileService.getBusinessProfile()
      .pipe(
        catchError(err => {
          console.log(err.status);
          if (err.status === 404) {
            this.errorMessage = 'Create a business profile';
            return of(undefined);
          }
          this.serverErrorFlag = true;
          this.loader = false;
          return throwError(err);
        }),
        retryWhen(
          delayWhen(() => timer(300))
        ),
        takeUntil(this.$onDestroy)
      )
      .subscribe(response => {
        this.profile = response;
        this.loader = false;
        // this.errorMessage = undefined; // This changes the values of the current state
        this.serverErrorFlag = false;
      }, error => {
        this.errorMessage = error.error.message;
        this.loader = false;
      });
  }

  // Add business profile
  public addBusinessProfile(event: BusinessProfile): void {
    this.loader = true;
    const addProfile$ = this.profileService.addBusinessProfile(event);
    addProfile$
    .pipe(
      catchError(err => {
        console.log(err.status);
        this.serverErrorFlag = true;
        this.loader = false;
        return throwError(err);
      }),
      retryWhen(
        delayWhen(() => timer(300))
      )
    )
    .subscribe(response => {
      this.changesApplied = true;
      this.loader = false;
      // Update current user
      this.localStrategy.updateCurrentUser();
      window.location.reload();
    }, error => {
      console.error(error);
    });
  }

  // Update business
  public updateBusinessProfile(event: BusinessProfile): void {
    this.loader = true;
    const updateProfile$ = this.profileService.updateBusinessProfile(event);
    const getBusinessProfile$ = this.profileService.getBusinessProfile();

    // Concat both methods
    const result$ = concat(updateProfile$, getBusinessProfile$);
    result$.subscribe(response => {
      if (response !== null) {
        this.profile = response;
        this.changesApplied = true;
        this.loader = false;
      }
    }, err => {
      console.log(err);
      this.loader = false;
    });
  }
}
