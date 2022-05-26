import { Component, OnInit } from '@angular/core';
import { EmailService } from '../services/email.service';
import { ActivatedRoute } from '@angular/router';
import { EmailToReturnDto } from '../interfaces/emailToReturnDto';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError, timer, Subject } from 'rxjs';
import { finalize } from 'rxjs/internal/operators/finalize';
import { retryWhen, delayWhen, takeUntil, tap } from 'rxjs/operators';
import { EmailToCreateDto } from '../interfaces/emailToCreateDto';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { UserService } from 'src/app/users/services/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-email-thread',
  templateUrl: './email-thread.component.html',
  styleUrls: ['./email-thread.component.css']
})
export class EmailThreadComponent implements OnInit {

  // Public variables
  recipientId: number;
  emails: EmailToReturnDto[];
  deleteConfirmation: boolean;
  emailId: number;
  loader: boolean;
  currentUserId: number;

  // Form strategy
  emailSendFlag: boolean;
  emailSending: boolean;
  isBlocked: boolean;
  initialBoolean: boolean;
  conversationValidatorFlag: boolean;

  // Error handling
  serverError: boolean;

  // On destroy observable
  private onDestroy$ = new Subject<boolean>();

  constructor(
    private emailService: EmailService,
    private route: ActivatedRoute,
    private localStrategy: LocalStrategyService,
    private userService: UserService,
    private titleService: Title
    ) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.getThread();
      this.recipientId = routeParams.id;
      this.currentUserId = this.localStrategy.getUserId();
    });
  }

  public getThread(): void {
    this.loader = true;
    this.recipientId = this.route.snapshot.params.id;
    const currentUserId = this.localStrategy.getCurrentUser().id;
    this.emailService.getThread(this.recipientId)
      .pipe(
        tap(messages => {
          // tslint:disable-next-line: prefer-for-of
          for (let index = 0; index < messages.length; index++) {
            if (messages[index].read === false && messages[index].recipientId === currentUserId) {
              console.log('Is not read');
              // Read the message and update the navigation
              this.emailService.markAsRead(currentUserId, messages[index].id);
            }
          }
        }),
        catchError(err => {
          this.serverError = true;
          this.loader = false;
          return throwError(err);
        }),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(300))
        ))
      )
      .subscribe(res => {
        this.loader = false;
        this.emails = res;
        this.serverError = false;

        // Validate match
        const valResult = this.validateMatch(
          res[0].recipient.businessId,
          res[0].sender.businessId);

        this.titleService.setTitle(`${res[0].recipient.providerFullName} - Messages`);
      }, err => {
        this.loader = false;
        this.conversationValidatorFlag = true;
        console.error(err);
      });
  }

  // Email strategy
  public replyMessage(event: EmailToCreateDto): void {
    this.loader = true;
    this.emailSending = true;
    this.emailService.createMessage(event)
      .pipe(
        catchError(err => {
          console.log('Error ocurred ' + err);
          this.emailSending = false;
          this.loader = false;
          return throwError(err);
        }),
        finalize(() => {
          // We could display the server error or
          // any other here.
          console.log('Sending message finalized');
        }),
        retryWhen(errors => errors.pipe(
          // Try again if it fails
          // 0.3 seconds after the issue
          delayWhen(() => timer(300))
        )),
        takeUntil(this.onDestroy$)
      ).subscribe(res => {
        if (res !== null) {
          // display email send alert
          console.log(res);
          this.emailSending = false;
          this.emailSendFlag = true;
          this.emails.unshift(res);
          this.loader = false;
        }
      }, err => {
        this.loader = false;
        this.emailSending = false;
        console.log(err);
      });
  }

  public removeEmail(id: number): void {
    this.deleteConfirmation = true;
    this.emailId = id;
  }

  public cancelDeleting(event: boolean): void {
    this.deleteConfirmation = event;
  }

  public deleteMessage(event): void {
    this.loader = true;
    this.emailService.deleteMessage(event).subscribe(() => {
      this.emails.splice(this.emails.findIndex(m => m.id === event), 1); // Here we delete the message from the array
      this.loader = false;
    }, (error: any) => {
      this.loader = false;
      console.error(error);
    });
  }

  public validateMatch(
    targetBusinessProfileId: number,
    currentProfileId: number): void {
    this.userService.validateMatch(currentProfileId, targetBusinessProfileId)
      .pipe(
        catchError(err => {
          console.error(err);
          return throwError(err);
        }),
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(300))
        ))
      )
      .subscribe(res => {
        this.initialBoolean = true;
        this.isBlocked = res.matchExists;
        console.log(res.matchExists);
        if (res.matchExists) {
          this.conversationValidatorFlag = false;
        }
      }, error => {
        console.error(error);
      });
  }

  public conversationValidator($event: boolean): void {
    this.conversationValidatorFlag = $event;
  }
}
