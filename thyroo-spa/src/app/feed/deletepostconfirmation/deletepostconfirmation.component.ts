import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-deletepostconfirmation',
  templateUrl: './deletepostconfirmation.component.html',
  styleUrls: ['./deletepostconfirmation.component.css']
})
export class DeletepostconfirmationComponent implements OnInit {

  // Inputs
  @Input() deleteConfirmation: boolean;
  @Input() userId: number;
  @Input() currentUserId: number;
  @Input() postItemId: number;
  @Input() itemId: number;

  // Outputs
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() postToRemove: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  public removePost(postId: number): void {
    this.postToRemove.emit(postId);
  }

  public cancelPostDeleting(): void {
    this.deleteConfirmation = false;
    this.visibleChange.emit(this.deleteConfirmation);
  }
}
