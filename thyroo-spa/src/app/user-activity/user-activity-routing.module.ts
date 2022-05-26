import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserContainerComponent } from './user-container/user-container.component';

const routes: Routes = [
  { path: 'user/recent-activity/:id', component: UserContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: []
})
export class UserActivityRouterModule { }
