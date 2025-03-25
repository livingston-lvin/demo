import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { DispatchReportService } from '../../services/dispatch-report.service';
import { LoaderService } from '../../services/loader.service';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SnackbarService } from '../../services/snackbar.service';
import { Error, Success } from '../../constants/AppData';

@Component({
  selector: 'app-dispatch-report',
  templateUrl: './dispatch-report.component.html',
  styleUrl: './dispatch-report.component.scss',
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class DispatchReportComponent {
  iciciFile: File | undefined;
  appleFile: File[] = [];
  private _formBuilder = inject(FormBuilder);
  appleCount=signal<number>(0);
  iciciCount=signal<number>(0);

  firstFormGroup: FormGroup = this._formBuilder.group({ firstCtrl: [''] });
  secondFormGroup: FormGroup = this._formBuilder.group({ secondCtrl: [''] });

  @ViewChild('stepper') stepperRef!: any;

  constructor(
    private dispatchReportService: DispatchReportService,
    private loader: LoaderService,
    private toast: SnackbarService
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
          this.iciciCount.set(res.value)
          this.loader.showLoader(false);
          this.toast.openSnackBar({
            type: Success,
            title: 'File upload',
            msg: 'Successfully uploaded',
            duration: undefined,
          });
          this.stepperRef.next();
        },
        (err) => {
          console.log(err);
          this.loader.showLoader(false);
          this.toast.openSnackBar({
            type: Error,
            title: 'File upload',
            msg: 'Upload failed',
            duration: undefined,
          });
        }
      );
    }
  }

  uploadAppleData(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.appleFile = Array.from(input.files);
      const formData = new FormData();
      this.appleFile.forEach((file) => formData.append('files', file));
      this.loader.showLoader(true);
      this.dispatchReportService.uploadApple(formData).subscribe(
        (res) => {
          console.log(res);
          this.appleCount.set(res.value)
          this.loader.showLoader(false);
          this.toast.openSnackBar({
            type: Success,
            title: 'File upload',
            msg: 'Successfully uploaded',
            duration: undefined,
          });
          this.stepperRef.next();
        },
        (err) => {
          console.log(err);
          this.loader.showLoader(false);
          this.toast.openSnackBar({
            type: Error,
            title: 'File upload',
            msg: 'Upload failed',
            duration: undefined,
          });
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

  downloadAppleFormat() {
    this.loader.showLoader(true);
    this.dispatchReportService.downloadApple().subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'apple_format.xlsx';
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
  downloadIciciFormat() {
    this.loader.showLoader(true);
    this.dispatchReportService.downloadIcici().subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'icici_format.xlsx';
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
