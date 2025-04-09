import { Component, Inject, OnInit, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { taskTitle: string }
  ) {}

  ngOnInit() {
    // Focus the cancel button by default
    setTimeout(() => {
      const cancelButton = document.querySelector('#cancelButton') as HTMLElement;
      if (cancelButton) {
        cancelButton.focus();
      }
    });
  }

  @HostListener('keydown.escape')
  onEscape() {
    this.onNoClick();
  }

  @HostListener('keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    // Prevent form submission if any
    event.preventDefault();
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
