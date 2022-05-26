import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPost } from '../interfaces/iPost';
import { environment } from 'src/environments/environment';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { ICategory } from '../interfaces/iCategory';
import { IComment, IReplyComment } from '../interfaces/iCommets';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  baseUrl = `${environment.baseUrl}`;
  constructor(
    private httpClient: HttpClient,
    private localStrategy: LocalStrategyService) { }

  getPosts(userId: number, pageNumber: number): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>(`${this.baseUrl}post/getPosts/${userId}/${pageNumber}`, {});
  }

  getPostsByCategory(userId: number, pageNumber: number, categoryId: number): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>(`${this.baseUrl}post/getPostsByCategory/${userId}/${pageNumber}/${categoryId}`, {});
  }

  getSinglePost(postId: number): Observable<IPost> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.get<IPost>(`${this.baseUrl}post/getSiglePost/${userId}/${postId}`, {});
  }

  // Note: this method should be called twice in the app
  // User share replay
  public getCategories(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(`${this.baseUrl}post/categories`, {});
  }

  public getCategory(categoryId: number): Observable<ICategory> {
    return this.httpClient.get<ICategory>(`${this.baseUrl}post/getCategoryInfo/${categoryId}`, {});
  }

  public addPost(post: IPost): Observable<IPost> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.post<IPost>(`${this.baseUrl}post/create/${userId}`, post);
  }

  public deletePost(postId: number): Observable<any> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.delete<boolean>(`${this.baseUrl}post/delete/${userId}/${postId}`, {});
  }

   public addLike(postId: number): Observable<any> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.post<any>(`${this.baseUrl}post/like/${userId}/${postId}`, {});
  }

  public removeLike(postId: number): Observable<any> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.delete<any>(`${this.baseUrl}post/like/${userId}/${postId}`, {});
  }

  public saveComment(postId: number, comment: IComment): Observable<IComment> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.post<IComment>(`${this.baseUrl}post/createcomment/${userId}/${postId}`, comment);
  }

  public saveReply(commentId: number, reply: IReplyComment): Observable<IReplyComment> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.post<IReplyComment>(`${this.baseUrl}post/createReply/${userId}/${commentId}`, reply);
  }

  public deleteComment(commentId: number): Observable<any> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.delete<boolean>(`${this.baseUrl}post/deleteComment/${userId}/${commentId}`, {});
  }

  public deleteReply(replyId: number): Observable<any> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.delete<boolean>(`${this.baseUrl}post/deleteReply/${userId}/${replyId}`, {});
  }
}
