import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-email',
  templateUrl: './delete-email.component.html',
  styleUrls: ['./delete-email.component.css']
})
export class DeleteEmailComponent implements OnInit {

  // Inputs
  @Input() itemId: number;
  @Input() deleteConfirmation: boolean;
  @Input() emailId: number;

   // Outputs
   @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
   @Output() postToRemove: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  public removeEmail(postId: number): void {
    this.postToRemove.emit(postId);
  }

  public cancelDeleting(): void {
    this.deleteConfirmation = false;
    this.visibleChange.emit(this.deleteConfirmation);
  }

}
