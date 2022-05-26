import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxComponent } from './inbox/inbox.component';
import { EmailRoutingModule } from './email-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ComposeEmailComponent } from './compose-email/compose-email.component';
import { RouterModule } from '@angular/router';
import { EmailThreadComponent } from './email-thread/email-thread.component';
import { EmailMenuComponent } from './email-menu/email-menu.component';
import { UserCardComponent } from './user-card/user-card.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// NgX-Bootstrap
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { EmailResolver } from './resolvers/email.resolver';
import { OutboxResolver } from './resolvers/outbox.resolver';
import { OutboxComponent } from './outbox/outbox.component';
import { ReplyMessageComponent } from './reply-message/reply-message.component';
import { DeleteEmailComponent } from './delete-email/delete-email.component';
import { MyFilterPipe } from '../core/pipes/myFilter.pipe';
import { InboxPipeFilterPipe } from '../core/pipes/InboxPipeFilter.pipe';
import { QuillModule } from 'ngx-quill';
import { ContactsAsideComponent } from './contacts-aside/contacts-aside.component';


@NgModule({
  imports: [
    CommonModule,
    EmailRoutingModule,
    SharedModule,
    RouterModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    QuillModule.forRoot()
  ],
  declarations: [
    InboxComponent,
    OutboxComponent,
    ComposeEmailComponent,
    EmailThreadComponent,
    EmailMenuComponent,
    UserCardComponent,
    ReplyMessageComponent,
    DeleteEmailComponent,
    MyFilterPipe,
    InboxPipeFilterPipe,
    ContactsAsideComponent
  ], providers: [
    EmailResolver,
    OutboxResolver
  ]
})
export class EmailModule { }
