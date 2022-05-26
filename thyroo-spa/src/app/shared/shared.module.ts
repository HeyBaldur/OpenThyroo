// Core imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


//  Custom imports
import { NavigationComponent } from './navigation/navigation.component';
import { AddnewpostComponent } from './addnewpost/addnewpost.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { HelpLinksComponent } from './help-links/help-links.component';
import { VerfiedBadgeComponent } from './verfied-badge/verfied-badge.component';
import { VerifiedBadgeSmComponent } from './verified-badge-sm/verified-badge-sm.component';
import { ThyrooLoaderComponent } from './thyroo-loader/thyroo-loader.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { FullScreenLoaderComponent } from './full-screen-loader/full-screen-loader.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { AdvertisingComponent } from './advertising/advertising.component';
import { UsersBlockComponent } from '../feed/users-block/users-block.component';
import { LatestUsersComponent } from './latest-users/latest-users.component';
import { FeedSkeletonComponent } from './feed-skeleton/feed-skeleton.component';
import { AsideSkeletonLoaderComponent } from './aside-skeleton-loader/aside-skeleton-loader.component';
import { VerifiedBadgeGoldSmComponent } from './verified-badge-gold-sm/verified-badge-gold-sm.component';
import { FoolAsideMenuComponent } from './fool-aside-menu/fool-aside-menu.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';

@NgModule({
   imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      PopoverModule.forRoot()
   ],
   declarations: [
      NavigationComponent,
      AddnewpostComponent,
      LoaderComponent,
      ProgressBarComponent,
      HelpLinksComponent,
      VerfiedBadgeComponent,
      VerifiedBadgeSmComponent,
      TimeAgoPipe,
      ThyrooLoaderComponent,
      ServerErrorComponent,
      FullScreenLoaderComponent,
      AdvertisingComponent,
      LatestUsersComponent,
      FeedSkeletonComponent,
      AsideSkeletonLoaderComponent,
      VerifiedBadgeGoldSmComponent,
      FoolAsideMenuComponent,
      ScrollTopComponent
   ],
   exports: [
      NavigationComponent,
      AddnewpostComponent,
      LoaderComponent,
      ProgressBarComponent,
      HelpLinksComponent,
      VerfiedBadgeComponent,
      VerifiedBadgeSmComponent,
      TimeAgoPipe,
      ThyrooLoaderComponent,
      ServerErrorComponent,
      FullScreenLoaderComponent,
      AdvertisingComponent,
      LatestUsersComponent,
      FeedSkeletonComponent,
      AsideSkeletonLoaderComponent,
      VerifiedBadgeGoldSmComponent,
      FoolAsideMenuComponent,
      ScrollTopComponent
   ]
})
export class SharedModule { }
