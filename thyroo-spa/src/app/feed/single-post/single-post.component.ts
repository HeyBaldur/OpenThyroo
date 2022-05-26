import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EmbedVideoService } from 'ngx-embed-video';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Subject, throwError, timer } from 'rxjs';
import { FeedService } from '../services/feed.service';
import { IPost } from '../interfaces/iPost';
import { catchError, retryWhen, delayWhen } from 'rxjs/operators';
import { User } from 'src/app/core/interfaces/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { INotification } from 'src/app/shared/interfaces/INotification';
import { Title, Meta } from '@angular/platform-browser';



@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  // Public variables
  loader: boolean;
  skeleton: boolean;
  post: IPost;
  currentUser: User;

  // Likes and unlikes flags
  liked: boolean;
  unlike: boolean;
  deleteConfirmation: boolean;
  postItemId: number;

  // Comments public variables
  addCommentFlag: boolean;
  delCommentFlag: boolean;
  notification: INotification;

  // Private variables
  private $onDestroy = new Subject<boolean>();
  commentForm: FormGroup;

  // Post id
  postToQuery: number;

  constructor(
    private feedService: FeedService,
    public domSanitizer: DomSanitizer,
    public embedService: EmbedVideoService,
    private authenticationService: AuthenticationService,
    private localStrategy: LocalStrategyService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationsService,
    private titleService: Title,
    private meta: Meta
  ) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.getCurrentUser();
    this.setCommentForm();


    // Get id by params
    this.postToQuery = this.route.snapshot.params.id;
    this.displayPost(this.postToQuery);

  }

  // Retreive posts
  public displayPost(postId: number): void {
    this.skeleton = true;
    const user = this.authenticationService.getCurrentUser();
    this.feedService.getSinglePost(postId)
      .pipe(
        catchError(err => {
          return throwError(err);
        }),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(300))
        ))
      )
      .subscribe((response: IPost) => {

        // Validate response
        if (response === null) {
          this.router.navigate(['/error/500']);
        }
        response.description = this.domSanitizer.bypassSecurityTrustHtml(response.description);
        this.post = response;
        this.titleService.setTitle(`${response.title}`);
        this.skeleton = false;
        console.log(response);

        // Set meta tags
        this.meta.addTags([
          { name: 'keywords', content: response.category.name },
          { name: 'description', content: response.title },
          { name: 'robots', content: 'index, follow' }
        ]);

        for (const key in this.post) {
          if (this.post.hasOwnProperty(key)) {
            const element = this.post[key];
            const postToFind = this.post;
            const likes = postToFind.likeDet.find(e => e.userId === user.id);

            if (likes) {
              this.liked = true;
              postToFind.liked = true;
            }
          }
        }

        // End of logic
        this.skeleton = false;
      }, error => {
        this.skeleton = false;
        console.log(error);
      });
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
      // Return to main feed
      this.loader = false;
      this.router.navigate(['/feed']);
    }, error => {
      this.loader = false;
      console.error(error);
    });
  }

  // Like a post
  public like(event: number): void {
    this.feedService.addLike(event).subscribe(response => {
      const postToFind = this.post;
      // postToFind.likes = response;
      // postToFind.liked = true;
    }, error => {
      console.log(error);
    });
  }

  // Unlike a post
  public unLike(event: number): void {
    this.feedService.removeLike(event).subscribe(response => {
      const postToFind = this.post;
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

  public addComment(postId: number, recipiendId: number): void {
    this.postItemId = postId;
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
          username: user.username
        };
        response.user = userObj;
        const postToFind = this.post;

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
              username: response.user.username
            },
            userId: response.userId,
            description: response.description,
            created: response.created,
            likes: response.likes
          });
        } else {
          postToFind.comments.push(response);
        }
        this.commentForm.reset();
        this.addCommentFlag = false;
      }

      // Create a notification
      if (this.currentUser.id !== recipiendId) {
        this.notification = {
          userId: this.currentUser.id,
          recipientId: recipiendId,
          description: `${this.currentUser.providerFullName} has commented your post.`,
          url: `/feed/single/${postId}`
        };
        this.notificationService.create(this.notification).pipe(
          catchError(err => {
            return throwError(err);
          }),
          retryWhen(errors => errors.pipe(
            delayWhen(() => timer(300))
          ))
        ).subscribe();
      }

      // End of logic
      this.loader = false;
    }, () => {
      this.addCommentFlag = true;
      this.loader = false;
    });
  }

  public removeComment(event: number, postId: number): void {
    this.loader = true;
    this.feedService.deleteComment(event).subscribe(isRemoved => {
      if (isRemoved) {
        const postToFind = this.post;
        const index = postToFind.comments.findIndex((comment) => {
          return comment.id === event;
        });
        if (index >= 0) {
          postToFind.comments.splice(index, 1);
        }
      }

      // End of logic
      this.loader = false;
    }, error => {
      this.loader = false;
      console.error(error);
    });
  }
}
