import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';
import { GstService } from '../../../../../services/gst.service';
import { SnackbarService } from '../../../../../services/snackbar.service';
import { Success } from '../../../../../constants/AppData';

@Component({
  selector: 'app-create-gst-rate-master',
  templateUrl: './create-gst-rate-master.component.html',
  styleUrl: './create-gst-rate-master.component.scss',
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class CreateGstRateMasterComponent {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private gstService: GstService,
    private router: Router,
    private snackBarService: SnackbarService
  ) {
    this.form = this.fb.group({
      rate: [null, Validators.required],
      applicableDt: [null, Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.gstService.create(value).subscribe(
        (res) => {
          this.snackBarService.openSnackBar({
            msg: 'Gst Rate created successfully!',
            type: Success,
          });
          this.navigateToListGstPage();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  navigateToListGstPage() {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.aosUser,
      environment.gstMaster,
      environment.list,
    ]);
  }
}
