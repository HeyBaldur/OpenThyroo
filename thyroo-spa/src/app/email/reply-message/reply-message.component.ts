import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Subject } from 'rxjs';
import { Email } from '../interfaces/email';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reply-message',
  templateUrl: './reply-message.component.html',
  styleUrls: ['./reply-message.component.css']
})
export class ReplyMessageComponent implements OnInit {

  // ViewChild
  @ViewChild('closebutton') closebutton: { nativeElement: { click: () => void; }; };

  // Public variables
  @Input() recipientId: number;
  @Input() currentUserId: number;
  @Input() subject: string;
  @Input() toUsername: string;

  // Output
  @Output() messageReplied: EventEmitter<Email> = new EventEmitter<Email>();
  loader: boolean;

  // Form strategy
  emailForm: FormGroup;
  emailSendFlag: boolean;
  emailSending: boolean;

  // Check editor
  public postEditor = ClassicEditor;

  // On destroy observable
  private onDestroy$ = new Subject<boolean>();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.recipientId = routeParams.id;
      this.setForm();
    });
  }

  // Forms
  public setForm(): void {
    // Set form
    console.log('Setting form');
    console.log(this.recipientId);
    this.emailForm = new FormGroup({
      senderId: new FormControl(this.currentUserId, Validators.required), // Not to display in HTML
      recipientId: new FormControl(this.recipientId, Validators.required), // Not to display in HTML
      subject: new FormControl(this.subject),
      emailBody: new FormControl('', Validators.required),
      draft: new FormControl(false),
      favorite: new FormControl(false)
    });
  }

  public sendReply(): void {
    console.log(this.recipientId);
    this.messageReplied.emit(this.emailForm.value);
    this.setForm();
    // this.closebutton.nativeElement.click();
  }
}
