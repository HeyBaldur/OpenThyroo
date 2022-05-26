import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailToReturnDto } from '../interfaces/emailToReturnDto';
import { environment } from 'src/environments/environment';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { EmailToCreateDto } from '../interfaces/emailToCreateDto';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../interfaces/pagination';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  baseUrl = `${environment.baseUrl}`;
  constructor(
    private httpClient: HttpClient,
    private localStrategy: LocalStrategyService) { }

  createMessage(emailToCreate: EmailToCreateDto): Observable<EmailToReturnDto> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.post<EmailToReturnDto>(`${this.baseUrl}${userId}/EmailStrategy/createMessage`, emailToCreate);
  }

  // Get thread
  getThread(recipientId: number): Observable<EmailToReturnDto[]> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.get<EmailToReturnDto[]>(`${this.baseUrl}${userId}/EmailStrategy/getThread/${recipientId}`, {});
  }

  // Get all emails list
  public getEmails(userId: number, page?: any, itemsPerPage?: any, messageContainer?: any) {
    const paginatedResult: PaginatedResult<EmailToReturnDto[]> = new PaginatedResult<EmailToReturnDto[]>();
    let params = new HttpParams();
    params = params.append('MessageContainer', messageContainer);

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.httpClient.get<EmailToReturnDto[]>(`${this.baseUrl}${userId}/EmailStrategy/getMessagesForUser`,
      { observe: 'response', params })
      .pipe(
        map(res => {
          console.log(res.headers.get('Pagination'));
          paginatedResult.result = res.body;
          if (res.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(res.headers.get('Pagination'));
          }

          return paginatedResult;
        })
      );
  }

  public markAsRead(userId: number, messageId: number): void {
    this.httpClient.post(`${this.baseUrl}${userId}/EmailStrategy/markMessageAsRead/${messageId}/read`, {}).subscribe();
  }

  public deleteMessage(messageId: number): any {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.post(`${this.baseUrl}${userId}/EmailStrategy/deleteMessage/${messageId}`, {});
  }
}
