import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SearchUsersComponent } from './search-users/search-users.component';
import { UserResolver } from './resolvers/users.resolver';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'user/:id', component: UserDetailsComponent },
  { path: 'user/b/search', component: SearchUsersComponent, resolve: { users: UserResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: []
})
export class UsersRoutingModule { }
