// Core imports
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, of, throwError, timer } from 'rxjs';

// Custom imports
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { takeUntil, catchError, retryWhen, delayWhen } from 'rxjs/operators';
import { IPost } from 'src/app/feed/interfaces/iPost';
import { ArticlesService } from 'src/app/articles/services/articles.service';
import { Article } from 'src/app/articles/interfaces/Article';
import { BusinessInterest } from 'src/app/user-profile/interfaces/business-interest';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { INotification } from 'src/app/shared/interfaces/INotification';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  // Public properties
  userToQuery: number;
  profile: User;
  disabledItem: boolean;
  loader: boolean;
  views: number;

  // Public properties
  posts: IPost[];
  articles: Article[];
  businessInterest: BusinessInterest[];

  // Match strategy
  displayButton: boolean;
  displayMatched: boolean;
  notification: INotification;

  // Error handling
  errorFlag: boolean;

  // On destroy observable
  private onDestroy$ = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private localStrategy: LocalStrategyService,
    private articleService: ArticlesService,
    private router: Router,
    private notificationService: NotificationsService,
    private titleService: Title
    ) { }

  // On destroy
  ngOnDestroy(): void {
    this.onDestroy$.next(false);
  }

  // On init
  ngOnInit() {
    this.loader = true;
    this.userToQuery = this.route.snapshot.params.id;
    this.getProfile(this.userToQuery);
    if (this.userToQuery === this.localStrategy.getUserId()) {
      this.disabledItem = true;
    }

    // Get Activity
    this.getActivity(this.userToQuery);

    // Get all posts (up to 5)
    // this.getPosts(this.userToQuery);
  }

  public getProfile(userToQuery: number): void {
    this.loader = true;
    this.userService.getUserDetails(userToQuery)
      .pipe(
        catchError(err => {
          console.log('Error :', err);
          this.loader = false;

          if (err.status === 404) {
            return of(undefined);
          }

          // Default error page
          this.router.navigate(['/error/500']);
          return throwError(err);

        }),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(300))
        ))
      ).subscribe(response => {
        // Main variables
        this.profile = response;
        this.titleService.setTitle(response.knowAs);

        // Get business preferences
        this.getBusinessPreferences(this.profile.id);
        const currentProfileId = this.localStrategy.getBusinessProfileId();

        // Get IP address
        fetch('https://jsonip.com', { mode: 'cors' })
          .then((resp) => resp.json())
          .then((data) => {
            this.userService.addView(this.profile.id, data.ip).subscribe();
          });

        // Get views acounter
        this.getViewsCounter(this.profile.id);

        // Validate match
        this.validateMatch(currentProfileId, this.profile.id);

        // Loader is false
        this.loader = false;
      }, error => {
        console.log(error);
        this.loader = false;
      });
  }

  public getViewsCounter(businessProfileId: number): void {
    this.userService.getViews(businessProfileId).subscribe(response => {
      this.views = response;
    }, (error: any) => {
      console.error(error);
    });
  }

  public validateMatch(businessProfileId: number, targetBusinessProfileId: number): void {
    this.userService.validateMatch(businessProfileId, targetBusinessProfileId).subscribe(res => {
      console.log(res);
      this.displayButton = res.matchExists;
      this.displayMatched = res.matched;
    }, error => {
      console.error(error);
    });
  }

  public matchUser(
    targetBusinessProfileId: number,
    targetUserId: number): void {
    this.loader = true;
    const currentProfileId = this.localStrategy.getBusinessProfileId();
    const currentUserId = this.localStrategy.getUserId();
    if (currentProfileId === 0) {
      // User has not created a business profile yet
      this.errorFlag = true;
      this.loader = false;
    } else {
      this.userService.sendMatch(currentProfileId, targetBusinessProfileId)
      .pipe(
        catchError(err => {
          return throwError(err);
        }),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(300))
        ))
      )
      .subscribe(response => {
        // Response results
        this.displayButton = response.matchSent;
        this.displayMatched = response.isMatched;
        this.errorFlag = false;

        // Send the notification to the user
        const currentUserFullName = this.localStrategy.getCurrentUser().providerFullName;
        this.notificateUser(currentUserId, targetUserId, currentUserFullName);

        // End logic
        this.loader = false;
      }, error => {
        this.loader = false;
        console.error(error);
      });
    }
  }

  private notificateUser(
    currentUserId: number,
    targetUserId: number,
    currentUserName: string): void {
    this.notification = {
      userId: currentUserId,
      recipientId: targetUserId,
      description: `${currentUserName} has sent you a connection request.`,
      url: `http://localhost:4200/user/${currentUserId}`
    };
    this.notificationService.create(this.notification).subscribe();
  }

  public getPosts(profileId: number): void {
    this.userService.getPostsList(profileId)
      .pipe(
        catchError(err => {
          console.log('Error :', err);
          return throwError(err);
        }),
        takeUntil(this.onDestroy$)
      ).subscribe(response => {
        console.log(response);
        this.posts = response;
      }, err => {
        console.error(err);
      });
  }

  public getActivity(userId: number): void {
    this.articleService.getUseActivity(userId)
      .pipe(
        catchError(err => {
          return throwError(err);
        }),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(300))
        ))
      ).subscribe(response => {
        console.log(response);
        this.articles = response;
      }, err => {
        console.error(err);
      });
  }

  public getBusinessPreferences(businessProfileId: number): void {
    this.userService.getBusinessInterests(businessProfileId)
      .pipe(
        catchError(err => {
          return throwError(err);
        }),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(300))
        ))
      ).subscribe(response => {
        console.log(response);
        this.businessInterest = response;
      }, err => {
        console.error(err);
      });
  }

  public removeConnection(
    targetBusinessProfileId: number,
    targetUserId: number): void {
    this.loader = true;
    const currentProfileId = this.localStrategy.getBusinessProfileId();
    const currentUserId = this.localStrategy.getUserId();
    if (currentProfileId === 0) {
      // User has not created a business profile yet
      this.errorFlag = true;
      this.loader = false;
    } else {
      this.userService.removeMatch(currentProfileId, targetBusinessProfileId)
      .pipe(
        catchError(err => {
          return throwError(err);
        }),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(300))
        ))
      )
      .subscribe(response => {
        if (response) {
          this.displayButton = false;
          this.displayMatched = false;
        }
        this.loader = false;
      }, error => {
        this.loader = false;
        console.error(error);
      });
    }
  }
}
