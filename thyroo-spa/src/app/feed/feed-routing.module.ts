import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedHomeComponent } from './feed-home/feed-home.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { FeedHomeByCatComponent } from './feed-home-by-cat/feed-home-by-cat.component';

const routes: Routes = [
  { path: 'home', component: FeedHomeComponent },
  { path: '', component: FeedHomeComponent },
  { path: 'single/:id', component: SinglePostComponent },
  { path: 'topic/:id', component: FeedHomeByCatComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class FeedRoutingModule { }
