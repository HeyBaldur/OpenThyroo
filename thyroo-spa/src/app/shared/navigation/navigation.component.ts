import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from 'src/app/core/interfaces/user';
import { GlobalService } from '../services/global.service';
import { throwError, timer, concat } from 'rxjs';
import { retryWhen, delayWhen, catchError, map, concatMap } from 'rxjs/operators';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  // Public variables
  currentUser: User;
  isLoggedIn: boolean;
  newEmailsCounter: number;
  newNotificationsCounter: number;

  constructor(
    private authenticationService: AuthenticationService,
    private globalService: GlobalService,
    private notificationService: NotificationsService) { }

  ngOnInit() {
    if (this.authenticationService.isLoggedIn()) {
      this.currentUser = this.authenticationService.getCurrentUser();
      this.isLoggedIn = true;
      this.getEmailNotifications();
    }
  }

  public signOut(): void {
    this.authenticationService.signOut();
  }

  // Get number of non-read emails
  public getEmailNotifications(): void {

    // Email notifications and get all notifications
    const emailNotifications$ = this.globalService.getNonReadEmails();
    const getNotificationsCounter$ = this.notificationService.getCounter();

    // Concat map all the results
    emailNotifications$.pipe(
      catchError(err => {
        this.newEmailsCounter = 0;
        this.newNotificationsCounter = 0;
        return throwError(err);
      }),
      retryWhen(errors => errors.pipe(
        delayWhen(() => timer(300))
      )),
      concatMap(email => getNotificationsCounter$.pipe(
        map(counter => ({ email, counter })), // here we map the results
      ))
    ).subscribe(res => {
      this.newEmailsCounter = res.email;
      this.newNotificationsCounter = res.counter;
    }, () => {
      this.newEmailsCounter = 0;
      this.newNotificationsCounter = 0;
    });
  }
}
