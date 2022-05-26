import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { INotification } from '../interfaces/INotification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  baseUrl = `${environment.baseUrl}`;
  constructor(
    private httpClient: HttpClient,
    private localStrategy: LocalStrategyService) { }

  // Create a new notification
  public create(notification: INotification): Observable<boolean> {
    const currentUserId = this.localStrategy.getUserId();
    return this.httpClient.post<boolean>(`${this.baseUrl}notification/${currentUserId}/addNotification`, notification);
  }

  // Get list of notifications
  public get(): Observable<INotification[]> {
    const currentUserId = this.localStrategy.getUserId();
    return this.httpClient.get<INotification[]>(`${this.baseUrl}notification/${currentUserId}/getNotifications`, {});
  }

  // Get list of notifications
  public whoViewedMyProfile(): Observable<any[]> {
    const currentUserId = this.localStrategy.getUserId();
    const businessProfileId = this.localStrategy.getBusinessProfileId();
    return this.httpClient.get<any[]>(`${this.baseUrl}notification/${currentUserId}/whoViewedMyProfile/${businessProfileId}`, {});
  }

  // Get the number of unread notifications
  public getCounter(): Observable<number> {
    const currentUserId = this.localStrategy.getUserId();
    return this.httpClient.get<number>(`${this.baseUrl}notification/${currentUserId}/getNotificationsCounter`, {});
  }

  // Delete notification
  public delete(notificationId: number): Observable<boolean> {
    const currentUserId = this.localStrategy.getUserId();
    return this.httpClient.delete<boolean>(`${this.baseUrl}notification/${currentUserId}/deleteNotification/${notificationId}`, {});
  }

  // Read the notification => change the state from T to F
  public read(notificationId: number): Observable<boolean> {
    const currentUserId = this.localStrategy.getUserId();
    return this.httpClient.post<boolean>(`${this.baseUrl}notification/${currentUserId}/readNotification/${notificationId}`, {});
  }

  // Read the notification => change the state from T to F
  public readAll(): Observable<boolean> {
    const currentUserId = this.localStrategy.getUserId();
    return this.httpClient.post<boolean>(`${this.baseUrl}notification/${currentUserId}/markAllAsRead`, {});
  }
}
