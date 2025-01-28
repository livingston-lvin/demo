import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-image',
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent implements OnInit {
  url = signal<string | null>(null);
  readonly dialogRef = inject(MatDialogRef<ImageComponent>);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fileService: FileService
  ) {}
  ngOnInit(): void {
    this.fileService.download(this.data.fileId).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      this.data.srcUl = url;
      this.url.set(url)
    });
  }
}
