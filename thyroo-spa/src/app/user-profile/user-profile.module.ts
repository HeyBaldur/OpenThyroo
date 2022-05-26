import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { AddBusinessProfileComponent } from './add-business-profile/add-business-profile.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BusinessInterestsComponent } from './business-interests/business-interests.component';
import { AddBusinessInterestsComponent } from './add-business-interests/add-business-interests.component';
// tslint:disable-next-line: import-spacing
import { DeleteBusinessPreferenceConfirmationComponent } from
  './delete-business-preference-confirmation/delete-business-preference-confirmation.component';
import { RouterModule } from '@angular/router';
import { MySettingsComponent } from './my-settings/my-settings.component';
import { BusinessInterestsTabComponent } from './business-interests-tab/business-interests-tab.component';
import { MyArticlesComponent } from './my-articles/my-articles.component';
import { ArticlesComponent } from './articles/articles.component';
import { DeleteArticleComponent } from './delete-article/delete-article.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { PopoverModule } from 'ngx-bootstrap/popover';



@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    RouterModule,
    TypeaheadModule.forRoot(),
    PopoverModule.forRoot()
  ],
  declarations: [
    MyProfileComponent,
    BusinessProfileComponent,
    AddBusinessProfileComponent,
    BusinessInterestsComponent,
    AddBusinessInterestsComponent,
    DeleteBusinessPreferenceConfirmationComponent,
    MySettingsComponent,
    BusinessInterestsTabComponent,
    MyArticlesComponent,
    ArticlesComponent,
    DeleteArticleComponent,
    NotificationsComponent
  ]
})
export class UserProfileModule { }
