import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Subject, throwError, timer } from 'rxjs';
import { takeUntil, catchError, retryWhen, delayWhen, first } from 'rxjs/operators';
import { User } from 'src/app/core/interfaces/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { ActivatedRoute, Params } from '@angular/router';
import { IPost } from 'src/app/feed/interfaces/iPost';
import { ICategory } from 'src/app/feed/interfaces/iCategory';
import { UserActivityService } from '../services/user-activity.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  // Public variables
  postList: IPost[];
  pageNumber = 1;
  currentUser: User;
  loadMoreMessage: string;

  // Likes and unlikes flags
  liked: boolean;
  unlike: boolean;
  deleteConfirmation: boolean;
  postItemId: number;
  loader: boolean;
  skeleton: boolean;
  @Input() userId: number;

  // Error flag
  serverErrorFlag: boolean;

  // Private variables
  private $onDestroy = new Subject<boolean>();
  commentForm: FormGroup;

  constructor(
    private userActivityService: UserActivityService,
    private authenticationService: AuthenticationService,
    public domSanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.displayPosts(this.userId);
    this.currentUser = this.authenticationService.getCurrentUser();
    this.loadMoreMessage = 'Load more';
  }

  // Retreive posts
  public displayPosts(userId: number): void {
    this.skeleton = true;
    const user = this.authenticationService.getCurrentUser();
    this.userActivityService.getUserPosts(user.id, this.pageNumber, userId)
      .pipe(
        catchError(err => {
          console.log(err);
          this.serverErrorFlag = true;
          this.skeleton = false;
          return throwError(err);
        }),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(300))
        )),
        first()
      )
      .subscribe((response: IPost[]) => {
        console.log(this.pageNumber);
        this.skeleton = false;

        // tslint:disable-next-line: forin
        for (const key in response) {
          response[key].description = this.domSanitizer.bypassSecurityTrustHtml(response[key].description);
        }

        this.postList = response;
        for (const key in this.postList) {
          if (this.postList.hasOwnProperty(key)) {
            const element = this.postList[key];
            const postToFind = this.postList.find(e => e.id === element.id);
            const likes = postToFind.likeDet.find(e => e.userId === user.id);

            if (likes) {
              this.liked = true;
              postToFind.liked = true;
            }
          }
        }

        // Load more message
        this.serverErrorFlag = false;
        this.loadMoreMessage = 'Load more';
      }, error => {
        this.skeleton = false;
        console.log(error);
      });
  }

  public loadMore(): void {
    this.loadMoreMessage = 'Loading...';
    this.pageNumber = this.pageNumber + 1;
    console.log(this.pageNumber);
    this.displayPosts(this.userId);
  }
}
