import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FeedService } from '../services/feed.service';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { User } from 'src/app/core/interfaces/user';
import { ICategory } from '../interfaces/iCategory';
import { catchError, retryWhen, delayWhen } from 'rxjs/operators';
import { throwError, timer } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  // Public variables
  addPostForm: FormGroup;
  post: FormControl;
  categoryList: any;
  categories: ICategory[];
  public postEditor = ClassicEditor;
  displayAlert: boolean;
  postId: number;

  // Loader
  loader: boolean;

  // Current user
  currentUser: User;

  constructor(
    private feedService: FeedService,
    private localStrategy: LocalStrategyService,
    private router: Router) { }

  ngOnInit() {
    this.setPostForm();
    this.getCurrentUser();
    this.getCategories();

    ClassicEditor.extraPlugins = 'wordcount,notification';
    ClassicEditor.defaultConfig = {
      toolbar: {
        items: [
          'bold',
          'undo',
          'redo'
        ]
      },
      mention: {
        feeds: [
          {
            marker: '#',
            feed: ['#thyroo'],
            minimumCharacters: 1
          }
        ]
      }
    };
  }


  public getCurrentUser(): void {
    this.currentUser = this.localStrategy.getCurrentUser();
  }

  private setPostForm(): void {
    this.addPostForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      privatePost: new FormControl(false),
      categoryId: new FormControl('', Validators.required),
      url: new FormControl('')
    });
  }

  public createPost(): void {
    this.loader = true;
    this.feedService.addPost(this.addPostForm.value)
      .pipe(
        catchError(err => {
          console.error(err);
          return throwError(err);
        }),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(300))
        ))
      )
      .subscribe(response => {
        if (response.id !== null || response.id !== undefined) {
          // Display button to let the user know the question was
          // posted and/or update component
          this.postId = response.id;
          this.displayAlert = true;
          this.loader = false;
          this.router.navigate(['/feed/single/', response.id]);
        }
        this.setPostForm();
      }, error => {
        console.error(error);
        this.loader = false;
      });
  }

  public getCategories(): void {
    this.feedService.getCategories()
      .pipe(
        catchError(err => {
          console.error('Thyroo cannot get categories');
          return throwError(err);
        }),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(300))
        ))
      )
      .subscribe(response => {
        this.categories = response;
      });
  }

  public resetForm(): void {
    this.setPostForm();
  }
}
