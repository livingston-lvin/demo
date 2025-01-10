import { Component, Inject, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image',
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  readonly dialogRef = inject(MatDialogRef<ImageComponent>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
