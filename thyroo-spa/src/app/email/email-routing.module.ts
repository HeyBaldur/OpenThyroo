import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxComponent } from './inbox/inbox.component';
import { ComposeEmailComponent } from './compose-email/compose-email.component';
import { EmailThreadComponent } from './email-thread/email-thread.component';
import { EmailResolver } from './resolvers/email.resolver';
import { OutboxResolver } from './resolvers/outbox.resolver';
import { OutboxComponent } from './outbox/outbox.component';


const routes: Routes = [
  { path: 'email/inbox', component: InboxComponent, resolve: { messages: EmailResolver } },
  // { path: 'email/outbox', component: OutboxComponent, resolve: { messages: OutboxResolver } },
  { path: 'email', component: InboxComponent },
  // { path: 'email/thread/new/:id', component: ComposeEmailComponent },
  { path: 'email/thread/:id', component: EmailThreadComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EmailRoutingModule { }
