import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, ArticleToUpdateDto } from '../interfaces/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  baseUrl = `${environment.baseUrl}`;
  constructor(
    private httpClient: HttpClient,
    private localStrategy: LocalStrategyService) { }

  public addPost(article: Article): Observable<Article> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.post<Article>(`${this.baseUrl}Articles/postArticle/${userId}`, article);
  }

  getSinglePost(articleId: number): Observable<Article> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.get<Article>(`${this.baseUrl}Articles/getSigleArticle/${userId}/${articleId}`, {});
  }

  getMyArticles(userId: number): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.baseUrl}Articles/getArticlesByUser/${userId}`, {});
  }

  getUseActivity(userId: number): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.baseUrl}Articles/getActivity/${userId}`, {});
  }

  public deleteArticle(postId: number): Observable<any> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.delete<boolean>(`${this.baseUrl}Articles/deleteArticle/${userId}/${postId}`, {});
  }

  public updateArticle(articleToUpdateDto: ArticleToUpdateDto): Observable<any> {
    const userId = this.localStrategy.getUserId();
    return this.httpClient.put<boolean>(`${this.baseUrl}Articles/updateArticle/${userId}`, articleToUpdateDto);
  }
}
