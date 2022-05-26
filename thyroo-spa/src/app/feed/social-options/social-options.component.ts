import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ILikeDet } from '../interfaces/iLikeDet';
import { LocalStrategyService } from 'src/app/core/localStrategy.service';

@Component({
  selector: 'app-social-options',
  templateUrl: './social-options.component.html',
  styleUrls: ['./social-options.component.css']
})
export class SocialOptionsComponent implements OnInit {

  // Inputs
  @Input() itemId: number; // item.id
  @Input() liked: ILikeDet[]; // item.liked
  @Input() likeCounter: number; // item.likes
  @Input() commentsCounter: number; // item.comments?.length

  heartLiked: boolean;

  // Outputs
  @Output() postId: EventEmitter<number> = new EventEmitter<number>();

  constructor(private localStrategy: LocalStrategyService) { }

  ngOnInit() {
    this.liked.forEach(element => {
      if (element.userId === this.localStrategy.getCurrentUser().id && element.postId === this.itemId) {
        this.heartLiked = true;
      }
    });
  }

  public like(postId: number): void {
    this.postId.emit(postId);
    this.heartLiked = true;
  }

  public unLike(postId: number): void {
    this.postId.emit(postId);
    this.heartLiked = false;
  }
}
