import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { Observable } from 'rxjs';
import { BusinessProfile } from '../interfaces/business-profile';
import { Country } from '../interfaces/country';
import { environment } from 'src/environments/environment';
import { BusinessInterest } from '../interfaces/business-interest';
import { BusinessOfInterest } from '../interfaces/business-of-interest';
import { User } from 'src/app/core/interfaces/user';
import { UpdateAccount, PhotoUrlDto, EmailDto, PasswordDto } from '../interfaces/update-account';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private httpClient: HttpClient,
    private localStrategy: LocalStrategyService) { }

  // Get countries
  getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${environment.baseUrl}Global/getCountries`, {});
  }

  // Business Profile
  getBusinessProfile(): Observable<BusinessProfile> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.get<BusinessProfile>(`${environment.baseUrl}BusinessProfile/${userId}/getMyBusinessProfile`, {});
  }

  addBusinessProfile(businessProfile: BusinessProfile): Observable<BusinessProfile> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.post<BusinessProfile>(`${environment.baseUrl}BusinessProfile/${userId}/addBusinessProfile`, businessProfile);
  }

  updateBusinessProfile(businessProfile: BusinessProfile): Observable<BusinessProfile> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.put<BusinessProfile>(`${environment.baseUrl}BusinessProfile/${userId}/updateBusinessProfile`, businessProfile);
  }


  // Business interests
  getBusinessInterests(): Observable<BusinessInterest[]> {
    const userId = this.localStrategy.getUserId();
    const businessProfileId = this.localStrategy.getBusinessProfileId();
    const url = `${environment.baseUrl}BusinessProfile/${userId}/getBusinessInterests/${businessProfileId}`;
    return this.httpClient.get<BusinessInterest[]>(url, {});
  }

  deleteBusinessInterests(itemId: number): Observable<boolean[]> {
    const userId = this.localStrategy.getUserId();
    const businessProfileId = this.localStrategy.getBusinessProfileId();
    const url = `${environment.baseUrl}BusinessProfile/${userId}/deleteBusinessInterests/${itemId}/${businessProfileId}`;
    return this.httpClient.delete<boolean[]>(url, {});
  }

  // DropDown business options
  getBusinessTypes(): Observable<BusinessOfInterest[]> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.get<BusinessOfInterest[]>(`${environment.baseUrl}BusinessProfile/${userId}/getBusinessTypes`, {});
  }

  getProfileTypes(): Observable<BusinessOfInterest[]> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.get<BusinessOfInterest[]>(`${environment.baseUrl}BusinessProfile/${userId}/getProfileTypes`, {});
  }

  getProfileSubTypes(): Observable<BusinessOfInterest[]> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.get<BusinessOfInterest[]>(`${environment.baseUrl}BusinessProfile/${userId}/getProfilesSubTypes`, {});
  }

  // Add
  addBusinessInterests(params: any): Observable<BusinessInterest> {
    const userId = this.localStrategy.getUserId();
    const businessProfileId = this.localStrategy.getBusinessProfileId();
    const url = `${environment.baseUrl}BusinessProfile/${userId}/addBusinessInterests/${businessProfileId}`;
    return this.httpClient.post<BusinessInterest>(url, params);
  }

  // Update account settings
  updateFullName(fullName: UpdateAccount): Observable<User> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.post<User>(`${environment.baseUrl}Account/${userId}/updateFullName`, fullName);
  }

  updatePhotoUrl(photoUrl: PhotoUrlDto): Observable<PhotoUrlDto> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.post<PhotoUrlDto>(`${environment.baseUrl}Account/${userId}/updatePhotoUrl`, photoUrl);
  }

  updateEmail(emailAddress: EmailDto): Observable<EmailDto> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.post<EmailDto>(`${environment.baseUrl}Account/${userId}/updateEmail`, emailAddress);
  }

  updatePassword(passwordDto: PasswordDto): Observable<boolean> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.post<boolean>(`${environment.baseUrl}Account/${userId}/updatePassword`, passwordDto);
  }
}
