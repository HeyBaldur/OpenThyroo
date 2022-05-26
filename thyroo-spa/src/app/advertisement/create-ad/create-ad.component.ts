import { Component, OnInit } from '@angular/core';
import { throwError, timer } from 'rxjs';
import { catchError, retryWhen, delayWhen } from 'rxjs/operators';
import { AdvertisingService } from '../services/advertising.service';
import { states } from '../../shared/locations';
import { careers } from '../../shared/careers';
import { Campaign } from '../interfaces/campaign';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

// Upper and lower case updated
// Code-Review failed.
@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.css']
})
export class CreateAdComponent implements OnInit {

  // Public properties
  public selected: string;
  public careersSelected: string;
  public states = states;
  public careers = careers;
  public noLocations: boolean;
  public noCareers: boolean;
  public myCampaigns: Campaign[];
  public loader: boolean;

  // Forms
  adForm: FormGroup;

  constructor(
    private advertisingService: AdvertisingService,
    private route: Router) { }

  ngOnInit() {
    this.getMyCampaigns(); // Get my campaigns list
    this.setForm(); // Set my form
  }

  public typeaheadNoLocations(event: boolean): void {
    this.noLocations = event;
  }

  public typeaheadNoCareers(event: boolean): { invalid: boolean } {
    this.noCareers = event;
    return { invalid: true };
  }

  public getMyCampaigns(): void {
    this.loader = true;
    this.advertisingService.getCampaignsToList()
      .pipe(
        catchError(err => {
          this.loader = false;
          return throwError(err);
        }),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(300))
        ))
      )
      .subscribe(response => {
        this.loader = false;
        this.myCampaigns = response;
      }, err => {
        this.loader = false;
        console.error(err);
      });
  }

  public setForm(): void {
    this.adForm = new FormGroup({
      adsCampaignId: new FormControl('', Validators.required),
      objective: new FormControl('', Validators.required),
      locationName: new FormControl('', Validators.required),
      audience: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      sponsoredBy: new FormControl('', Validators.required),
      active: new FormControl(true, Validators.required)
    });
  }

  public submitAd(): void {
    this.loader = true;
    this.advertisingService.createAd(this.adForm.value)
      .pipe(
        catchError(err => {
          this.loader = false;
          return throwError(err);
        }),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(300))
        ))
      )
      .subscribe(response => {

        // Create FB object
        const obj = {
          id: response.id,
          clicks: response.clicks,
          impressions: response.impressions,
          engagements: response.engagements
        };

        // Reference FB instance service
        const fbRef = this.advertisingService.createRefInFirebase(obj)
          .then((res: { id: any; }) => {
            console.log(res.id);
            if (res.id !== null) {
              this.loader = false;
              this.route.navigate(['business/campaignmanager']);
            }
          }, (err: any) => {
            console.error(err);
            console.error('FB could not add information.');
            // Display an error
            // Remove current row added.
          });
      }, err => {
        this.loader = false;
        console.error(err);
      });
  }
}
