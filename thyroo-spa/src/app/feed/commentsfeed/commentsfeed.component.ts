import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IComment } from '../interfaces/iCommets';
import { FeedService } from '../services/feed.service';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/core/interfaces/user';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { INotification } from 'src/app/shared/interfaces/INotification';
import { catchError, retryWhen, delayWhen } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { timer } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-commentsfeed',
  templateUrl: './commentsfeed.component.html',
  styleUrls: ['./commentsfeed.component.css']
})
export class CommentsfeedComponent implements OnInit {

  // Inputs
  @Input() commentsArray: IComment[];
  @Input() itemId: number; // item.id
  @Input() currentUserId: number; // currentUser.id
  @Input() commentId: number; // commentId
  @Input() deleteConfirmation: boolean;

  // Outputs
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() postToRemove: EventEmitter<number> = new EventEmitter<number>();

  // Public properties
  showHideReplyInput: boolean;
  commentToReplyId: number;
  public replyForm: FormGroup;
  currentUser: User;
  notification: INotification;
  replyId: number;
  deleteReplyConfirmation: boolean;

  constructor(
    private feedService: FeedService,
    private notificationService: NotificationsService,
    private authenticationService: AuthenticationService,
    private localStrategy: LocalStrategyService) { }

  ngOnInit() {
    this.setReplyForm();
    this.currentUser = this.authenticationService.getCurrentUser();
  }

  public removeComment(commentId: number): void {
    this.postToRemove.emit(commentId);
  }

  public cancelCommentDeleting(): void {
    this.deleteConfirmation = false;
    this.visibleChange.emit(this.deleteConfirmation);
  }

  public removeCommentConfim(id: number): void {
    this.deleteConfirmation = true;
    this.commentId = id;
  }

  public removeReplyConfim(id: number): void {
    this.deleteReplyConfirmation = true;
    this.replyId = id;
  }

  public reply(displayInput: boolean, commentId: number): void {
    this.showHideReplyInput = displayInput;
    this.commentToReplyId = commentId;
  }

  private setReplyForm(): void {
    this.replyForm = new FormGroup({
      description: new FormControl('', Validators.required)
    });
  }

  public addReply(commentId: number, recipiendId: number, postId: number, event: any): void {
    if (event.key === 'Enter') {
      this.feedService.saveReply(commentId, this.replyForm.value).subscribe(response => {
        if (response !== undefined) { }

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
        const commentToFind = this.commentsArray.find(element => element.id === commentId);

        // Create a new array if the comments array is null
        if (commentToFind.commentsReplies === null) {
          commentToFind.commentsReplies = [];
          commentToFind.commentsReplies.push({
            id: response.id,
            commentId: response.commentId,
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
          });
        } else {
          commentToFind.commentsReplies.push(response);
        }

        // Create a notification
        if (this.currentUser.id !== recipiendId) {
          this.notification = {
            userId: this.currentUser.id,
            recipientId: recipiendId,
            description: `${this.currentUser.providerFullName} has replied to your comment.`,
            url: `/feed/single/${postId}`
          };

          // Send notification to the comment owner
          this.notificationService.create(this.notification).pipe(
            catchError(err => {
              return throwError(err);
            }),
            retryWhen(errors => errors.pipe(
              delayWhen(() => timer(300))
            ))
          ).subscribe();
        }

        // Reset form
        this.showHideReplyInput = false;
        this.replyForm.reset();
      });
    }
  }

  public cancelDeleting(event: boolean): void {
    this.deleteConfirmation = event;
  }

  public cancelReplyDeleting(event: boolean): void {
    this.deleteReplyConfirmation = event;
  }

  public removeReply(event: number, commentId: number): void {
    this.feedService.deleteReply(event).subscribe(isRemoved => {
      if (isRemoved) {
        const commentToFind = this.commentsArray.find(element => element.id === commentId);
        const index = commentToFind.commentsReplies.findIndex((comment) => {
          return comment.id === event;
        });
        if (index >= 0) {
          commentToFind.commentsReplies.splice(index, 1);
        }

        // Deleting logic ends
        // this.loader = false;
      }
    }, error => {
      // this.loader = false;
      console.error(error);
    });
  }
}
