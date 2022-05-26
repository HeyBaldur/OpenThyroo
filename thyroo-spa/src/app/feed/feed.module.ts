import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedHomeComponent } from './feed-home/feed-home.component';
import { FeedRoutingModule } from './feed-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddPostComponent } from './add-post/add-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmbedVideo } from 'ngx-embed-video';
import { PostOptionsComponent } from './post-options/post-options.component';
import { CategoriesBlockComponent } from './categories-block/categories-block.component';
import { UsersBlockComponent } from './users-block/users-block.component';
import { LikeComponent } from './like/like.component';
import { CommentsfeedComponent } from './commentsfeed/commentsfeed.component';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DeletepostconfirmationComponent } from './deletepostconfirmation/deletepostconfirmation.component';
import { SocialOptionsComponent } from './social-options/social-options.component';
import { FilterUniquePipe } from '../core/pipes/filterUnique.pipe';
import { ProfileValidatorComponent } from './profile-validator/profile-validator.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { FeedHomeByCatComponent } from './feed-home-by-cat/feed-home-by-cat.component';
import { CategoryProfileComponent } from './category-profile/category-profile.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { QuillModule } from 'ngx-quill';


@NgModule({
  imports: [
    CommonModule,
    FeedRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EmbedVideo.forRoot(),
    PopoverModule.forRoot(),
    RouterModule,
    CKEditorModule,
    ScrollingModule,
    QuillModule.forRoot()
  ],
  declarations: [
    FeedHomeComponent,
    AddPostComponent,
    PostOptionsComponent,
    CategoriesBlockComponent,
    UsersBlockComponent,
    LikeComponent,
    CommentsfeedComponent,
    DeletepostconfirmationComponent,
    SocialOptionsComponent,
    FilterUniquePipe,
    ProfileValidatorComponent,
    SinglePostComponent,
    FeedHomeByCatComponent,
    CategoryProfileComponent
  ]
})
export class FeedModule { }
