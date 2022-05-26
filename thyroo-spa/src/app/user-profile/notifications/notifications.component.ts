import { Component, OnInit } from '@angular/core';
import { INotification } from 'src/app/shared/interfaces/INotification';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { catchError, retryWhen, delayWhen } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notificationList: INotification[];
  peopleWhoViewedMyProfile: any[];
  loader: boolean;
  constructor(
    private notificationService: NotificationsService,
    private router: Router,
    private titleService: Title
    ) { }

  ngOnInit() {
    this.getNotifications(); // Get all notifications
    this.getWhoViewedMyProfile();
    this.titleService.setTitle('Notifications');
  }

  public getNotifications(): void {
    this.loader = true;
    this.notificationService.get().
    pipe(
      catchError(err => {
        this.router.navigate(['/error/500']);
        return throwError(err);
      }),
      retryWhen(errors => errors.pipe(
        delayWhen(() => timer(300))
      ))
    ).subscribe(response => {
      this.loader = false;
      this.notificationList = response;
    }, err => {
      this.loader = false;
      console.error(err);
    });
  }

  public navigate(url: string, notificationId: number): void {
    this.notificationService.read(notificationId).
    pipe(
      catchError(err => {
        this.router.navigate(['/error/500']);
        return throwError(err);
      }),
      retryWhen(errors => errors.pipe(
        delayWhen(() => timer(300))
      ))
    ).subscribe(response => {
      if (response) {
        window.location.replace(url);
      }
    }, err => {
      this.loader = false;
      console.error(err);
    });
  }

  public getWhoViewedMyProfile(): void {
    this.notificationService.whoViewedMyProfile().
    pipe(
      catchError(err => {
        return throwError(err);
      }),
      retryWhen(errors => errors.pipe(
        delayWhen(() => timer(300))
      ))
    ).subscribe(response => {
      this.peopleWhoViewedMyProfile = response;
      console.log(response);
    }, err => {
      this.loader = false;
      console.error(err);
    });
  }

  public readAll(): void {
    this.notificationService.readAll().
    pipe(
      catchError(err => {
        this.router.navigate(['/error/500']);
        return throwError(err);
      }),
      retryWhen(errors => errors.pipe(
        delayWhen(() => timer(300))
      ))
    ).subscribe(response => {
      if (response) {
        this.getNotifications();
      }
    }, err => {
      this.loader = false;
      console.error(err);
    });
  }

}
