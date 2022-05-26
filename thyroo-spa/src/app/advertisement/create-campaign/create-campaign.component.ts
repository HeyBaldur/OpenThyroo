import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdvertisingService } from '../services/advertising.service';
import { Subscription, throwError, timer } from 'rxjs';
import { catchError, retryWhen, delayWhen } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit, OnDestroy {

  // Public properties
  datePickerConfig: Partial<BsDatepickerConfig>;
  campaignForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  loader: boolean;

  // Private properties

  constructor(
    private advertisingService: AdvertisingService,
    private route: Router) { }
  ngOnDestroy(): void {
    // Code unsubcribe here
  }

  ngOnInit() {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-default' });
    this.setForm();
    this.setDates();
  }

  public setForm(): void {
    this.campaignForm = new FormGroup({
      adName: new FormControl('', Validators.required),
      ends: new FormControl('', Validators.required)
    });
  }

  public setDates(): void {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() + 30);
  }

  public createCampaign(): void {
    this.loader = true;
    this.advertisingService.addCampaign(this.campaignForm.value)
      .pipe(
        catchError(err => {
          return throwError(err);
        }),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(300))
        ))
      )
      .subscribe(response => {
        this.loader = false;
        this.route.navigate(['business/campaignmanager']);
      }, err => {
        this.loader = false;
        console.error(err);
      });
  }
}
