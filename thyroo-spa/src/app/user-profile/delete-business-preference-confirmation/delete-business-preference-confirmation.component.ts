import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-delete-business-preference-confirmation',
  templateUrl: './delete-business-preference-confirmation.component.html',
  styleUrls: ['./delete-business-preference-confirmation.component.css']
})
export class DeleteBusinessPreferenceConfirmationComponent implements OnInit {

  // Inputs
  @Input() deleteConfirmation: boolean;
  @Input() itemId: number;
  @Input() referenceId: number;

  // Outputs
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() itemToRemove: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  public removeItem(itemId: number): void {
    this.itemToRemove.emit(itemId);
  }

  public cancelDeleting(): void {
    this.deleteConfirmation = false;
    this.visibleChange.emit(this.deleteConfirmation);
  }

}
