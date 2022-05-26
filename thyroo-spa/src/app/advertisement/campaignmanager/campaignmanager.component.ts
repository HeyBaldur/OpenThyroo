import { Component, OnInit } from '@angular/core';
import { AdvertisingService } from '../services/advertising.service';
import { Campaign } from '../interfaces/campaign';
import { catchError, retryWhen, delayWhen, map, first } from 'rxjs/operators';
import { throwError, timer } from 'rxjs';
import { Advertising } from '../interfaces/advertising';

// Completed pulled
@Component({
  selector: 'app-campaignmanager',
  templateUrl: './campaignmanager.component.html',
  styleUrls: ['./campaignmanager.component.css']
})
export class CampaignmanagerComponent implements OnInit {

  campaigns: Campaign[];
  myAds: Advertising[];
  loader: boolean;
  public today = new Date();

  constructor(private advertisingService: AdvertisingService) { }

  ngOnInit() {
    this.getCampaigns();
    this.getAdsList();
  }

  public getCampaigns(): void {
    this.loader = true;
    this.advertisingService.getCampaigns()
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
        this.campaigns = response;
      }, err => {
        this.loader = false;
        console.error(err);
      });
  }

  public getAdsList(): void {
    this.loader = true;
    this.advertisingService.getMyAds()
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

        response.forEach(element => {
          const analitics = this.advertisingService.getValues(element.id)
            .snapshotChanges()
            .pipe(
              map((changes: any[]) => {
                changes.map(a => {
                  const id = a.payload.doc.id;
                  const ad = a.payload.doc.data();
                  const views = ad.impressions + 1;
                  const engagements = ad.engagements;
                  const clicks = ad.clicks;

                  element.impressions = views;
                  element.engagements = engagements;
                  element.clicks = clicks;

                });
              }),
              first()
            ).subscribe();
        });


        this.myAds = response;
        console.log(response);
      }, err => {
        this.loader = false;
        console.error(err);
      });
  }

  public shutAd(adId: number): void {
    this.advertisingService.stopAd(adId)
    .pipe(
      catchError(err => {
        this.loader = false;
        return throwError(err);
      }),
      retryWhen(errors => errors.pipe(
        delayWhen(() => timer(300))
      ))
    ).subscribe(response => {
      console.log(response);
      this.getAdsList();
    });
  }

  private getAnalitycs(adId: number): any {
    return this.advertisingService.getValues(adId);
  }
}
