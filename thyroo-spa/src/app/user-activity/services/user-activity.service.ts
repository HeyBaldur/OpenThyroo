import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPost } from 'src/app/feed/interfaces/iPost';
import { environment } from 'src/environments/environment';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';

@Injectable({
  providedIn: 'root'
})
export class UserActivityService {

  constructor(
    private httpClient: HttpClient,
    private localStrategy: LocalStrategyService) { }

  // Get posts list by user
  getPostsList(userToQuery: number): Observable<IPost[]> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.get<IPost[]>(`${environment.baseUrl}post/getPostsByUserList/${userId}/${userToQuery}`, {});
  }

  getUserPosts(userId: number, pageNumber: number, profileId: number): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>(`${environment.baseUrl}post/getPostsByUser/${userId}/${pageNumber}/${profileId}`, {});
  }

}
