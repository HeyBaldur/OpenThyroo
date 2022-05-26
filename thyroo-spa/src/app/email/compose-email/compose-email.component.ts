import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EmailService } from '../services/email.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';
import { catchError, finalize, retryWhen, delayWhen, takeUntil } from 'rxjs/operators';
import { throwError, timer } from 'rxjs';

@Component({
  selector: 'app-compose-email',
  templateUrl: './compose-email.component.html',
  styleUrls: ['./compose-email.component.css']
})
export class ComposeEmailComponent implements OnInit, OnDestroy {

  // Public variables
  userToQuery: number;
  loader: boolean;
  toUsername: string;
  isMatched: boolean;

  // Form strategy
  emailForm: FormGroup;
  emailSendFlag: boolean;
  emailSending: boolean;
  displayAlert: boolean;


  // Check editor
  public postEditor = ClassicEditor;

  // On destroy observable
  private onDestroy$ = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private emailStrategy: EmailService,
    private localStrategy: LocalStrategyService) { }

  ngOnDestroy(): void {
    this.onDestroy$.next(false);
  }

  ngOnInit(
  ) {
    this.setForm();
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

  public setUsername(event: string): void {
    this.toUsername = event;
  }

  public validateMatch(event: boolean): void {
    this.isMatched = event;
    this.displayAlert = true;
  }

  // Forms
  public setForm(): void {
    // user's id
    this.userToQuery = this.route.snapshot.params.id;
    const currentUserId = this.localStrategy.getUserId();

    // Set form
    this.emailForm = new FormGroup({
      senderId: new FormControl(currentUserId, Validators.required), // Not to display in HTML
      recipientId: new FormControl(this.userToQuery, Validators.required), // Not to display in HTML
      subject: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      emailBody: new FormControl('', Validators.required),
      draft: new FormControl(false),
      favorite: new FormControl(false)
    });
  }

  // Email strategy
  public send(): void {
    this.emailSending = true;
    this.emailStrategy.createMessage(this.emailForm.value)
      .pipe(
        catchError(err => {
          console.log('Error ocurred ' + err);
          this.emailSending = false;
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
          this.displayAlert = true;
          // display email send alert
          console.log(res);
          this.emailSending = false;
          this.emailSendFlag = true;
          this.setForm();
        }
      }, err => {
        this.emailSending = false;
        console.log(err);
      });
  }
}
