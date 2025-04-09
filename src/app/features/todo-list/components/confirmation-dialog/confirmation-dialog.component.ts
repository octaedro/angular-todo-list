import { Component, Inject, AfterViewInit, HostListener, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * Confirmation dialog component for task deletion.
 * Provides a modal dialog with confirmation options and keyboard navigation.
 */
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements AfterViewInit {
  @ViewChild('cancelButton') private cancelButton!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { taskTitle: string },
    private cdr: ChangeDetectorRef
  ) {}

  /**
   * Focuses the cancel button after the view is initialized.
   * This is the preferred way to handle focus in Angular Material dialogs.
   */
  ngAfterViewInit() {
    // Force a change detection cycle to ensure the view is fully rendered
    this.cdr.detectChanges();

    // Use requestAnimationFrame to ensure the DOM is ready
    requestAnimationFrame(() => {
      if (this.cancelButton?.nativeElement) {
        this.cancelButton.nativeElement.focus();
      }
    });
  }

  /**
   * Handles escape key press to close the dialog.
   */
  @HostListener('keydown.escape')
  onEscape(): void {
    this.onNoClick();
  }

  /**
   * Prevents form submission on enter key press.
   */
  @HostListener('keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent): void {
    event.preventDefault();
  }

  /**
   * Handles the cancel action.
   */
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  /**
   * Handles the confirm action.
   */
  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
