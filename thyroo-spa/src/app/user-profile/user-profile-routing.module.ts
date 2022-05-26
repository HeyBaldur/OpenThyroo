import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MySettingsComponent } from './my-settings/my-settings.component';
import { BusinessInterestsTabComponent } from './business-interests-tab/business-interests-tab.component';
import { MyArticlesComponent } from './my-articles/my-articles.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  { path: 'profile', component: MyProfileComponent },
  { path: 'profile/interests', component: BusinessInterestsTabComponent },
  { path: 'profile/articles', component: MyArticlesComponent },
  { path: 'psettings', component: MySettingsComponent },
  { path: 'notifications', component: NotificationsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: []
})
export class UserProfileRoutingModule { }
