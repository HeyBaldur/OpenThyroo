import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ArticlesService } from '../services/articles.service';
import { catchError, retryWhen, delayWhen, takeUntil } from 'rxjs/operators';
import { throwError, timer, of, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from '../interfaces/Article';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';


@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit, OnDestroy {

  // Public variables
  articleForm: FormGroup;
  loader: boolean;
  article: Article;
  articleId: number;
  isUpdate: boolean;
  unauthorized: boolean;
  articleError: boolean;
  notFound: boolean;

  // On destroy
  private $onDestroy = new Subject<boolean>();

  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private localStrategy: LocalStrategyService) { }

  ngOnInit() {
    this.articleId = this.activatedRoute.snapshot.params.id;
    if (this.articleId) {
      // Update article
      this.loader = true;
      this.isUpdate = true;
      this.articlesService.getSinglePost(this.articleId)
      .pipe(
        catchError(err => {
          // Server error
          if (err.status === 500) {
            this.router.navigate(['/error/500']);
          }
          this.loader = false;
          return throwError(err);
        }),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(300))
        )),
        takeUntil(this.$onDestroy)
      ).subscribe(response => {

        // Validate if the article value
        if (response === null) {
          // Article does not exists
          this.notFound = true;
        }

        this.loader = false;
        this.article = response;
        const currentUserId = this.localStrategy.getCurrentUser().id;
        if (response.user.id !== currentUserId) {
          this.unauthorized = true;
        } else {
          this.setUpdateForm();
        }
      }, err => {
        this.loader = false;
        console.error(err);
      });
    } else {
      this.isUpdate = false;
      this.setForm();
    }
  }

  // Create form
  private setForm(): void {
    this.articleForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(2000)])
    });
  }

  // Set update form
  public setUpdateForm(): void {
    this.articleForm = new FormGroup({
      title: new FormControl(this.article.title, [Validators.required]),
      description: new FormControl(this.article.description, [Validators.required, Validators.minLength(2000)]),
      id: new FormControl(this.article.id),
      userId: new FormControl(this.localStrategy.getUserId())
    });
  }

  // Add article
  public addArticle(): void {
    this.loader = true;
    this.articlesService.addPost(this.articleForm.value)
      .pipe(
        catchError(err => {
          // Server error
          if (err.status === 500) {
            this.router.navigate(['/error/500']);
          }

          // Default retuning value
          this.loader = false;
          console.log(err);
          return throwError(err);
        }),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(300)
          ))
        ),
        takeUntil(this.$onDestroy)
      )
      .subscribe(res => {
        if (res) {
          this.articleError = false;
        }
        this.loader = false;
        this.router.navigate(['/articles/' + res.id]);
      }, err => {
        this.articleError = true;
        console.log(err);
      });
  }

  public updateArticle(): void {
    this.loader = true;
    this.articlesService.updateArticle(this.articleForm.value)
      .pipe(
        catchError(err => {
          // Article not found
          if (err.status === 400) {
            this.articleError = true;
            return of(undefined);
          }

          // Server error
          if (err.status === 500) {
            this.router.navigate(['/error/500']);
          }

          // Default retuning value
          this.loader = false;
          console.log(err);
          return throwError(err);
        }),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(300)
          ))
        ))
      .subscribe(res => {
        if (res) {
          this.articleError = false;
        }

        // Logic continues
        this.loader = false;
        this.router.navigate(['/articles/' + res.id]);
      }, err => {
        this.articleError = true;
        console.log(err);
      });
  }

  ngOnDestroy(): void {
    this.$onDestroy.next(false);
  }
}
