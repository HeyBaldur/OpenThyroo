import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from '../interfaces/campaign';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, first } from 'rxjs/operators';
import { Advertising } from '../interfaces/advertising';
import { AdTracker } from '../interfaces/adTracker';

// Check upper and lower cases
// This might affect the DO.
@Injectable({
  providedIn: 'root'
})
export class AdvertisingService {

  public firebaseResult: string;
  baseUrl = `${environment.baseUrl}`;

  constructor(
    private httpClient: HttpClient,
    private localStrategy: LocalStrategyService,
    public firebaseDb: AngularFirestore) { }

  public addCampaign(campaign: Campaign): Observable<Campaign> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.post<Campaign>(`${this.baseUrl}advertising/addCampaign/${userId}`, campaign);
  }

  public getCampaigns(): Observable<Campaign[]> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.get<Campaign[]>(`${this.baseUrl}advertising/getCampaigns/${userId}`, {});
  }

  public getCampaignsToList(): Observable<Campaign[]> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.get<Campaign[]>(`${this.baseUrl}advertising/getCampaignsToList/${userId}`, {});
  }

  public createAd(adInfo: Advertising): Observable<Advertising> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.post<Advertising>(`${this.baseUrl}advertising/addAd/${userId}`, adInfo);
  }

  // Create an ad reference in the firebase
  public createRefInFirebase(data: AdTracker): any {
    return this.firebaseDb.collection('ads-tracker').add(data);
  }

  // Get and set view to the ad
  public setAnalitycs(adId: number) {
    const query = this.firebaseDb.collection('ads-tracker', ref => ref.where('id', '==', adId));
    query.snapshotChanges()
      .pipe(
        map((changes: any[]) => {
          changes.map(a => {
            const id = a.payload.doc.id;
            const ad = a.payload.doc.data();
            const views = ad.impressions + 1;
            this.firebaseDb.collection('ads-tracker').doc(id).update({
              impressions: views
            });
          });
        }),
        first()
      ).subscribe();
  }

  // Set clicks
  public setClick(adId: number) {
    const query = this.firebaseDb.collection('ads-tracker', ref => ref.where('id', '==', adId));
    query.snapshotChanges()
      .pipe(
        map((changes: any[]) => {
          changes.map(a => {
            const id = a.payload.doc.id;
            const ad = a.payload.doc.data();
            const clicksCounter = ad.clicks + 1;
            this.firebaseDb.collection('ads-tracker').doc(id).update({
              clicks: clicksCounter
            });
          });
        }),
        first()
      ).subscribe();
  }


  public getValues(adId: number): any {
    return this.firebaseDb.collection('ads-tracker', ref => ref.where('id', '==', adId));
  }

  public stopAd(adId: number): Observable<boolean> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.post<boolean>(`${this.baseUrl}advertising/deactivateAd/${userId}/${adId}`, {});
  }

  public getMyAds(): Observable<Advertising[]> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.get<Advertising[]>(`${this.baseUrl}advertising/getMyAds/${userId}`, {});
  }
}
