import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { BusinessParams, PaginatedResult } from '../interfaces/business-params';
import { MatchLogic, MatchLogicResul } from '../interfaces/match-logic';
import { IPost } from 'src/app/feed/interfaces/iPost';
import { map } from 'rxjs/operators';
import { BusinessInterest } from 'src/app/user-profile/interfaces/business-interest';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  viewObject: any;
  constructor(
    private httpClient: HttpClient,
    private localStrategy: LocalStrategyService) { }

  getAllUsers(): Observable<User[]> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.get<User[]>(`${environment.baseUrl}User/${userId}/getUsers`, {});
  }

  getUserDetails(userToQuery: number): Observable<User> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.get<User>(`${environment.baseUrl}User/${userId}/getUser/${userToQuery}`, {});
  }

  // Add view
  addView(targetProfileId: number, ip: string): Observable<boolean> {
    const userId = this.localStrategy.getUserId(); // Current authed user
    const businessProfileId = this.localStrategy.getBusinessProfileId(); // Current profile
    this.viewObject = {
      businessProfileId,
      ip,
      targetBusinessProfileId: targetProfileId
    };
    return this.httpClient.post<boolean>(`${environment.baseUrl}BusinessProfile/${userId}/addView`, this.viewObject);
  }

  // Get all profile views
  getViews(businessProfileId: number): Observable<number> {
    const userId = this.localStrategy.getUserId(); // Current authed user
    return this.httpClient.get<number>(`${environment.baseUrl}BusinessProfile/${userId}/getViews/${businessProfileId}`, {});
  }

  findUsers(businessParams: BusinessParams): Observable<any> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.post<any>(`${environment.baseUrl}User/${userId}/getUserByCriteria`, businessParams);
  }

  getLatest(): Observable<any> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.get<any>(`${environment.baseUrl}User/${userId}/getLatest`, {});
  }

  // Match strategy
  validateMatch(businessProfileId: number, targetBusinessProfileId: number): Observable<MatchLogic> {
    const userId = this.localStrategy.getUserId();
    const url = `${environment.baseUrl}match/${userId}/validateMatch/${businessProfileId}/${targetBusinessProfileId}`;
    return this.httpClient.get<MatchLogic>(url, {});
  }

  sendMatch(businessProfileId: number, targetBusinessProfileId: number): Observable<MatchLogicResul> {
    const userId = this.localStrategy.getUserId();
    const url = `${environment.baseUrl}match/${userId}/matchUser/${businessProfileId}/${targetBusinessProfileId}`;
    return this.httpClient.post<MatchLogicResul>(url, {});
  }

  removeMatch(businessProfileId: number, targetBusinessProfileId: number): Observable<boolean> {
    const userId = this.localStrategy.getUserId();
    const url = `${environment.baseUrl}match/${userId}/removeMatch/${businessProfileId}/${targetBusinessProfileId}`;
    return this.httpClient.post<boolean>(url, {});
  }

  // Get posts list by user
  getPostsList(userToQuery: number): Observable<IPost[]> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.get<IPost[]>(`${environment.baseUrl}post/getPostsByUserList/${userId}/${userToQuery}`, {});
  }

  getUsers(page?: any, itemsPerPage?: any, userParams?: any): Observable<PaginatedResult<User[]>> {
    // Get current user id
    const userId = this.localStrategy.getUserId();

    // Instantiate the PaginatedResult
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    // We set the params HttpParams
    let params = new HttpParams();

    // We validate if the page and itemsPerPage are not null
    // If they are not, so we set the values
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams !== undefined || userParams != null) {
      params = params.append('businessTypeId', userParams.businessTypeId);
      params = params.append('profileTypeId', userParams.profileTypeId);
      params = params.append('profileSubTypeId', userParams.profileSubTypeId);

      // Validate country id
      if (userParams.countryId !== '') {
        params = params.append('countryId', userParams.countryId);
      }

      // Validate title
      if (userParams.title !== '') {
        params = params.append('title', userParams.title);
      }

      // Validate city
      if (userParams.city !== '') {
        params = params.append('city', userParams.city);
      }
    }

    if (userParams === undefined || userParams != null) {
      params = params.append('businessTypeId', '0');
      params = params.append('profileTypeId', '0');
      params = params.append('profileSubTypeId', '0');
    }

    // Send the request to the API
    return this.httpClient.get<User[]>(`${environment.baseUrl}User/${userId}/getUserByCriteria` + '', { observe: 'response', params })
      .pipe(map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
      );
  }

  getBusinessInterests(businessProfileId: number): Observable<BusinessInterest[]> {
    const userId = this.localStrategy.getUserId();
    const url = `${environment.baseUrl}BusinessProfile/${userId}/getBusinessInterestsByUser/${businessProfileId}`;
    return this.httpClient.get<BusinessInterest[]>(url, {});
  }
}
