import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-article',
  templateUrl: './delete-article.component.html',
  styleUrls: ['./delete-article.component.css']
})
export class DeleteArticleComponent implements OnInit {

  // Inputs
  @Input() itemId: number;
  @Input() deleteConfirmation: boolean;
  @Input() articleId: number;

   // Outputs
   @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
   @Output() postToRemove: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  public deleteArticle(articleId: number): void {
    this.postToRemove.emit(articleId);
  }

  public cancelDeleting(): void {
    this.deleteConfirmation = false;
    this.visibleChange.emit(this.deleteConfirmation);
  }
}
