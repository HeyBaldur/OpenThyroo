import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { ServerErrorPageComponent } from './server-error-page/server-error-page.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { HelpCenterComponent } from './help-center/help-center.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './NotFound/NotFound.component';
import { PolicyComponent } from './policy/policy.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'legal/privacy-policy', component: PolicyComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'help/faq', component: HelpCenterComponent },
  { path: '', loadChildren: () => import('./authentication/authentication.module').then(mod => mod.AuthenticationModule) },
  { path: 'feed', loadChildren: () => import('./feed/feed.module').then(mod => mod.FeedModule), canActivate: [AuthGuard] },
  {
    path: '', loadChildren: () => import('./user-profile/user-profile.module').then(mod => mod.UserProfileModule),
    canActivate: [AuthGuard]
  },
  { path: '', loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule), canActivate: [AuthGuard] },
  { path: '', loadChildren: () => import('./email/email.module').then(mod => mod.EmailModule), canActivate: [AuthGuard] },
  {
    path: '', loadChildren: () => import('./user-activity/user-activity.module').then(mod => mod.UserActivityModule),
    canActivate: [AuthGuard]
  },
  { path: '', loadChildren: () => import('./articles/articles.module').then(mod => mod.ArticlesModule), canActivate: [AuthGuard] },
  {
    path: '', loadChildren: () => import('./advertisement/advertisement.module').then(mod => mod.AdvertisementModule),
    canActivate: [AuthGuard]
  },
  { path: 'error/500', component: ServerErrorPageComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
