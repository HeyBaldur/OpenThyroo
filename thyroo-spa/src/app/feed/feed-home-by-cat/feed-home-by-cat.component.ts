import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EmbedVideoService } from 'ngx-embed-video';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Subject, throwError, timer } from 'rxjs';
import { FeedService } from '../services/feed.service';
import { IPost } from '../interfaces/iPost';
import { takeUntil, catchError, retryWhen, delayWhen } from 'rxjs/operators';
import { User } from 'src/app/core/interfaces/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ICategory } from '../interfaces/iCategory';

@Component({
  selector: 'app-feed-home-by-cat',
  templateUrl: './feed-home-by-cat.component.html',
  styleUrls: ['./feed-home-by-cat.component.css']
})
export class FeedHomeByCatComponent implements OnInit {

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
  categoryId: number;
  categoryInfo: ICategory;

  // Comments public variables
  addCommentFlag: boolean;
  delCommentFlag: boolean;
  displayUserBadge: boolean;
  badgeItemId: number;

  // Error flag
  serverErrorFlag: boolean;

  // Private variables
  private $onDestroy = new Subject<boolean>();
  commentForm: FormGroup;

  constructor(
    private feedService: FeedService,
    public domSanitizer: DomSanitizer,
    public embedService: EmbedVideoService,
    private authenticationService: AuthenticationService,
    private localStrategy: LocalStrategyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.categoryId = params.id;

      this.categoryId = this.route.snapshot.params.id;
      this.displayPosts(this.categoryId);
      this.currentUser = this.authenticationService.getCurrentUser();
      this.setCommentForm();
      this.loadMoreMessage = 'Load more';

      this.getCategory(this.categoryId);
    });
  }

  // Retreive posts
  public displayPosts(categoryId: number): void {
    this.skeleton = true;
    const user = this.authenticationService.getCurrentUser();
    this.feedService.getPostsByCategory(user.id, this.pageNumber, categoryId)
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
        takeUntil(this.$onDestroy)
      )
      .subscribe((response: IPost[]) => {
        console.log(response);
        this.skeleton = false;
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
    this.categoryId = this.route.snapshot.params.id;
    this.displayPosts(this.categoryId);
  }

  public removePostConfim(id: number): void {
    this.deleteConfirmation = true;
    this.postItemId = id;
  }

  public cancelDeleting(event: boolean): void {
    this.deleteConfirmation = event;
  }

  public removePost(event: number): void {
    this.loader = true;
    this.feedService.deletePost(event).subscribe(response => {
      if (response === true) {
        const index = this.postList.findIndex((element) => {
          return element.id === event;
        });
        if (index >= 0) {
          this.postList.splice(index, 1);
        }

        // Loader ends
        this.loader = false;
      }
    }, error => {
      this.loader = false;
      console.error(error);
    });
  }

  // Like a post
  public like(event: number): void {
    this.feedService.addLike(event).subscribe(response => {
      const postToFind = this.postList.find(element => element.id === event);
      // postToFind.likes = response;
      // postToFind.liked = true;
    }, error => {
      console.log(error);
    });
  }

  // Unlike a post
  public unLike(event: number): void {
    this.feedService.removeLike(event).subscribe(response => {
      const postToFind = this.postList.find(element => element.id === event);
      // postToFind.likes = response;
      // postToFind.liked = false;
    }, error => {
      console.log(error);
    });
  }


  private setCommentForm(): void {
    this.commentForm = new FormGroup({
      description: new FormControl('', Validators.required)
    });
  }

  public addComment(postId: number, event: any): void {
    this.postItemId = postId;
    if (event.key === 'Enter') {
      this.loader = true;
      this.addCommentFlag = true;
      this.feedService.saveComment(postId, this.commentForm.value).subscribe(response => {
        if (response !== undefined) {
          const user = this.localStrategy.getCurrentUser();
          const userObj = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            photoUrl: user.photoUrl,
            providerFullName: user.providerFullName,
            uid: user.uid,
            verifiedAccount: user.verifiedAccount,
            username: user.username,
            enrollmentDate: user.enrollmentDate,
            location: user.location,
            occupation: user.occupation
          };
          response.user = userObj;
          const postToFind = this.postList.find(element => element.id === postId);

          // Create a new array if the comments array is null
          if (postToFind.comments === null) {
            postToFind.comments = [];
            postToFind.comments.push({
              id: response.id,
              postId: response.postId,
              user: {
                id: response.user.id,
                firstName: response.user.firstName,
                lastName: response.user.lastName,
                photoUrl: response.user.photoUrl,
                verifiedAccount: response.user.verifiedAccount,
                uid: response.user.uid,
                providerFullName: response.user.providerFullName,
                username: response.user.username,
                enrollmentDate: response.user.enrollmentDate,
                location: response.user.location,
                occupation: response.user.occupation
              },
              userId: response.userId,
              description: response.description,
              created: response.created,
              likes: response.likes,
              commentsReplies: response.commentsReplies
            });

            // Comment logic ends
            this.loader = false;
          } else {
            this.loader = false;
            postToFind.comments.push(response);
          }
          this.commentForm.reset();
          this.addCommentFlag = false;
        }
      }, () => {
        this.addCommentFlag = true;
      });
    }
  }

  public removeComment(event: number, postId: number): void {
    this.loader = true;
    this.feedService.deleteComment(event).subscribe(isRemoved => {
      if (isRemoved) {
        const postToFind = this.postList.find(element => element.id === postId);
        const index = postToFind.comments.findIndex((comment) => {
          return comment.id === event;
        });
        if (index >= 0) {
          postToFind.comments.splice(index, 1);
        }

        // Deleting logic ends
        this.loader = false;
      }
    }, error => {
      this.loader = false;
      console.error(error);
    });
  }

  public getCategory(categoryId: number): void {
    this.feedService.getCategory(categoryId)
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        }),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(300))
        )),
      )
      .subscribe(cat => {
        this.categoryInfo = cat;
        console.log(cat);
      }, err => {
        console.error(err);
      });
  }

  public showBadge(flag: boolean, itemId: number): void {
    this.displayUserBadge = true;
    this.badgeItemId = itemId;
  }

  public hideBadge(flag: boolean, itemId: number): void {
    this.displayUserBadge = false;
    this.badgeItemId = itemId;
  }
}
