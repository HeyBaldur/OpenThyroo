import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, timer, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { UserMatched } from 'src/app/email/interfaces/user-matched';
import { ValidateBusinessRequirementsDto } from '../interfaces/validateBusinessRequirementsDto';
import { Country } from 'src/app/user-profile/interfaces/country';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError, retryWhen, delayWhen } from 'rxjs/operators';
import { Advertising } from 'src/app/advertisement/interfaces/advertising';
import { User } from 'src/app/core/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  baseUrl = `${environment.baseUrl}`;
  private refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private httpClient: HttpClient,
    private localStrategy: LocalStrategyService) { }

  public validateBusinessFeatures(userId: number): Observable<ValidateBusinessRequirementsDto> {
    const businessProfileId = this.localStrategy.getBusinessProfileId();
    return this.httpClient.get<ValidateBusinessRequirementsDto>(`${this.baseUrl}global/validateUser/${userId}/${businessProfileId}`, {});
  }

  public getRefresh(): Observable<boolean> {
    return this.refresh.asObservable();
  }

  public setRefresh(value: boolean): void {
    this.refresh.next(value);
  }

  // Get my matches
  public myMatches(): Observable<UserMatched[]> {
    const userId = this.localStrategy.getUserId();
    const businessId = this.localStrategy.getBusinessProfileId();
    return this.httpClient.get<UserMatched[]>(`${this.baseUrl}global/getMyMatches/${userId}/${businessId}`, {})
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        }),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(300)
          ))
        ));
  }

  // Validate connection to the server
  public validateConnection(): Observable<boolean> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.get<boolean>(`${this.baseUrl}global/tryConnection/${userId}`, {});
  }

  // Get number of non-read emails
  public getNonReadEmails(): Observable<number> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.get<number>(`${this.baseUrl}${userId}/EmailStrategy/getNewMessages`, {});
  }

  // Get all countries
  public getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${environment.baseUrl}Global/getCountries`, {});
  }

  // Get advertisement posts
  public getAds(): Observable<Advertising> {
    const currentUser = this.localStrategy.getCurrentUser();
    const userId = this.localStrategy.getUserId();
    return this.httpClient.get<Advertising>(
      `${this.baseUrl}advertising/getAds/${userId}/${currentUser.occupation}/${currentUser.location}`, {});
  }

  // Get all countries
  public getLatestUsers(): Observable<User[]> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.get<User[]>(`${environment.baseUrl}Global/getLatestUsers/${userId}`, {});
  }
}
