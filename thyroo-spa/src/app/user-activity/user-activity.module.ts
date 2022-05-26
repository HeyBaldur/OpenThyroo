import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserActivityRouterModule } from './user-activity-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserContainerComponent } from './user-container/user-container.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { RouterModule } from '@angular/router';
import { UserProfileCardComponent } from './user-profile-card/user-profile-card.component';
import { PopoverModule } from 'ngx-bootstrap/popover';

@NgModule({
  imports: [
    CommonModule,
    UserActivityRouterModule,
    SharedModule,
    RouterModule,
    PopoverModule.forRoot()
  ],
  declarations: [
    UserContainerComponent,
    UserPostsComponent,
    UserProfileCardComponent
  ]
})
export class UserActivityModule { }
