import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { BusinessInterest } from '../interfaces/business-interest';
import { concat, throwError, timer } from 'rxjs';
import { catchError, retryWhen, delayWhen } from 'rxjs/operators';

@Component({
  selector: 'app-business-interests',
  templateUrl: './business-interests.component.html',
  styleUrls: ['./business-interests.component.css']
})
export class BusinessInterestsComponent implements OnInit {

  // Public variables
  businessInterest: BusinessInterest[];
  deleteConfirmFlag: boolean;
  referenceId: number;
  loaderItem: boolean;
  loaderPage: boolean;
  itemId: number;

  // Error handling
  serverError: boolean;
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.displayBusinessIntersts();
  }

  public displayBusinessIntersts(): void {
    this.loaderPage = true;
    this.profileService.getBusinessInterests()
    .pipe(
      catchError(err => {
        this.loaderPage = false;
        this.serverError = true;
        return throwError(err);
      }),
      retryWhen(errors => errors.pipe(
        delayWhen(() => timer(300))
      ))
    )
    .subscribe(response => {
      this.businessInterest = response;
      this.loaderPage = false;
      this.serverError = false;
    }, err => {
      this.loaderPage = false;
      this.serverError = true;
    });
  }

  public deleteConfirm(itemId: number): void {
    this.deleteConfirmFlag = true;
    this.referenceId = itemId;
  }

  public addBusinessPreferences(event: boolean): void {
    if (event) {
      this.displayBusinessIntersts();
    }
  }

  public deleteItem(event: number): void {
    this.itemId = event;
    this.loaderItem = true;
    const deleteItem$ = this.profileService.deleteBusinessInterests(event);
    deleteItem$
    .pipe(
      catchError(err => {
        return throwError(err);
      }),
      retryWhen(errors => errors.pipe(
        delayWhen(() => timer(300))
      ))
    )
    .subscribe(response => {
      this.displayBusinessIntersts();
      this.loaderItem = false;
    });
  }

  public cancelDeleting(event: boolean): void {
    this.deleteConfirmFlag = event;
  }
}
