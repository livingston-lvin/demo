import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';
import { CourierService } from '../../../../../services/courier.service';
import { SnackbarService } from '../../../../../services/snackbar.service';
import { Success } from '../../../../../constants/AppData';

@Component({
  selector: 'app-create-courier-company-master',
  templateUrl: './create-courier-company-master.component.html',
  styleUrl: './create-courier-company-master.component.scss',
  imports: [FormsModule, ReactiveFormsModule],
})
export class CreateCourierCompanyMasterComponent {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private courierService: CourierService,
    private router: Router,
    private snackBarService: SnackbarService
  ) {
    this.form = this.fb.group({
      companyName: [null, Validators.required],
      mobileNo: [null, Validators.required],
      contactPerson: [null, Validators.required],
      trackingWebsite: [null, Validators.required],
      email: [null, Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.courierService.create(value).subscribe(
        (res) => {
          this.snackBarService.openSnackBar({
            msg: 'Courier created successfully!',
            type: Success,
          });
          this.navigateToListCourierPage();
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      alert('Please fill all mandetory fields...');
    }
  }

  navigateToListCourierPage() {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.aosUser,
      environment.courierMaster,
      environment.list,
    ]);
  }

  validateNumberInput(event: KeyboardEvent): void {
    const allowedKeys = [
      'Backspace',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
      'Delete',
    ];

    if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
}
