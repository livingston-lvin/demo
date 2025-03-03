import { Component } from '@angular/core';
import { DispatchReportService } from '../../services/dispatch-report.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-dispatch-report',
  imports: [],
  templateUrl: './dispatch-report.component.html',
  styleUrl: './dispatch-report.component.scss',
})
export class DispatchReportComponent {
  iciciFile: File | undefined;
  appleFile: File [] = [];

  constructor(
    private dispatchReportService: DispatchReportService,
    private loader: LoaderService
  ) {}

  uploadIciciData(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.iciciFile = input.files[0];
      const formData = new FormData();
      formData.append('file', this.iciciFile);
      this.loader.showLoader(true);
      this.dispatchReportService.uploadIcici(formData).subscribe(
        (res) => {
          console.log(res);
          this.loader.showLoader(false);
        },
        (err) => {
          console.log(err);
          this.loader.showLoader(false);
        }
      );
    }
  }

  uploadAppleData(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.appleFile = Array.from(input.files);
      const formData = new FormData();
      this.appleFile.forEach(file => formData.append('files', file));
      this.loader.showLoader(true);
      this.dispatchReportService.uploadApple(formData).subscribe(
        (res) => {
          console.log(res);
          this.loader.showLoader(false);
        },
        (err) => {
          console.log(err);
          this.loader.showLoader(false);
        }
      );
    }
  }

  download() {
    this.loader.showLoader(true);
    this.dispatchReportService.download().subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'fin_data.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
        this.loader.showLoader(false);
      },
      (err) => {
        console.log(err);
        this.loader.showLoader(false);
      }
    );
  }
}
