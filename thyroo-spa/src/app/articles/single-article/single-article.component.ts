import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../services/articles.service';
import { Article } from '../interfaces/Article';
import { catchError, retryWhen, delayWhen } from 'rxjs/operators';
import { throwError, timer } from 'rxjs';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.css']
})
export class SingleArticleComponent implements OnInit {

  // Public variables
  articleId: number;
  article: Article;
  loader: boolean;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticlesService,
    private router: Router) { }

  ngOnInit() {
    this.articleId = this.route.snapshot.params.id;
    this.displayArticle(this.articleId);
  }

  // Retreive posts
  public displayArticle(postId: number): void {
    this.loader = true;
    this.articleService.getSinglePost(postId)
      .pipe(
        catchError(err => {
          this.router.navigate(['/error/500']);
          return throwError(err);
        }),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(300)
        ))
      ))
      .subscribe((response: Article) => {
        this.article = response;
        // End of logic
        this.loader = false;
      }, error => {
        this.loader = false;
        console.log(error);
      });
  }

}
