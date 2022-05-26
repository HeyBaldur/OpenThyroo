import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateArticleComponent } from './create-article/create-article.component';
import { SingleArticleComponent } from './single-article/single-article.component';

const routes: Routes = [
  { path: 'articles/new', component: CreateArticleComponent },
  { path: 'articles/update/:id', component: CreateArticleComponent },
  { path: 'articles/:id', component: SingleArticleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
