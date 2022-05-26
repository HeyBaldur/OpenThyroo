import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { BusinessOfInterest } from '../interfaces/business-of-interest';
import { ProfileType } from '../interfaces/profile-type';
import { ProfileSubType } from '../interfaces/profile-sub-type';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { concat, throwError, timer } from 'rxjs';
import { tap, map, catchError, retryWhen, delayWhen } from 'rxjs/operators';

@Component({
  selector: 'app-add-business-interests',
  templateUrl: './add-business-interests.component.html',
  styleUrls: ['./add-business-interests.component.css']
})
export class AddBusinessInterestsComponent implements OnInit {

  // Public variables
  businessTypes: BusinessOfInterest[];
  profileTypes: ProfileType[];
  profileSubTypes: ProfileSubType[];
  businessProfileFlag: boolean;
  businessProfileMessage: string;

  // Forms
  formPreferences: FormGroup;

  // Outputs
  @Output() outputResult: EventEmitter<boolean> = new EventEmitter<boolean>();

  // ViewChild
  @ViewChild('closebutton') closebutton: any;
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.populateDropDowns();
    this.setForm();
  }

  public populateDropDowns(): void {
    const businessTypes$ = this.profileService.getBusinessTypes();
    const profileTypes$ = this.profileService.getProfileTypes();
    const profileSubTypes$ = this.profileService.getProfileSubTypes();

    businessTypes$
    .pipe(
      catchError(err => {
        return throwError(err);
      }),
      retryWhen(errors => errors.pipe(
        delayWhen(() => timer(300))
      ))
    ).subscribe(result => {
      this.businessTypes = result;
    });

    profileTypes$
    .pipe(
      catchError(err => {
        return throwError(err);
      }),
      retryWhen(errors => errors.pipe(
        delayWhen(() => timer(300))
      ))
    ).subscribe(result => {
      this.profileTypes = result;
    });

    profileSubTypes$
    .pipe(
      catchError(err => {
        return throwError(err);
      }),
      retryWhen(errors => errors.pipe(
        delayWhen(() => timer(300))
      ))
    ).subscribe(result => {
      this.profileSubTypes = result;
    });
  }

  public setForm(): void {
    this.formPreferences = new FormGroup({
      businessOfInterestId: new FormControl('1', Validators.required),
      profileTypesId: new FormControl('9', Validators.required),
      profileSubTypesId: new FormControl('1', Validators.required)
    });
  }

  public addPreferences(): void {
    this.profileService.addBusinessInterests(this.formPreferences.value).subscribe(response => {
      this.closebutton.nativeElement.click();
      this.outputResult.emit(true);
      this.businessProfileFlag = false;
    }, error => {
      this.businessProfileFlag = true;
      this.businessProfileMessage = error.error.message;
    });
  }
}
