import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/articles/services/articles.service';
import { Article } from 'src/app/articles/interfaces/Article';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { catchError, retryWhen, delayWhen } from 'rxjs/operators';
import { throwError, timer } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  // Public variables
  articles: Article[];
  loader: boolean;
  deleteConfirmation: boolean;
  articleId: number;

  constructor(
    private articleService: ArticlesService,
    private localStrategy: LocalStrategyService) { }

  ngOnInit() {
    this.displayArticles();
  }

  public displayArticles(): void {
    this.loader = true;
    const userId = this.localStrategy.getUserId();
    this.articleService.getMyArticles(userId)
      .pipe(
        catchError(err => {
          this.loader = false;
          return throwError(err);
        }),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(300)
          ))
        )).subscribe(response => {
          this.loader = false;
          this.articles = response;
        }, err => {
          this.loader = false;
          console.error(err);
        });
  }

  public removeArticle(id: number): void {
    this.deleteConfirmation = true;
    this.articleId = id;
  }

  public cancelDeleting(event: boolean): void {
    this.deleteConfirmation = event;
  }

  public deleteArticle(event: number): void {
    this.loader = true;
    this.articleService.deleteArticle(event).subscribe(() => {
      this.loader = false;
      this.displayArticles();
    }, (error: any) => {
      this.loader = false;
      console.error(error);
    });
  }

}
