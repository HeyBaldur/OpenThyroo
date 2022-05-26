import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ArticlesRoutingModule } from './articles-routing.module';
import { SharedModule } from '../shared/shared.module';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SingleArticleComponent } from './single-article/single-article.component';
import { CreateArticleErrorComponent } from './create-article-error/create-article-error.component';
import { CreateCampaignComponent } from '../advertisement/create-campaign/create-campaign.component';

@NgModule({
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    SharedModule,
    QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CreateArticleComponent,
    SingleArticleComponent,
    CreateArticleErrorComponent
  ]
})
export class ArticlesModule { }
