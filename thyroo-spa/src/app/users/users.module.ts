import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchCategoriesModalComponent } from './search-categories-modal/search-categories-modal.component';
import { SearchUsersComponent } from './search-users/search-users.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { UserResolver } from './resolvers/users.resolver';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { UserActivityComponent } from './user-activity/user-activity.component';
import { UserBusinessPreferencesComponent } from './user-business-preferences/user-business-preferences.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    PaginationModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    SearchCategoriesModalComponent,
    SearchUsersComponent,
    UserActivityComponent,
    UserBusinessPreferencesComponent
  ],
  providers: [
    UserResolver
  ]
})
export class UsersModule { }
