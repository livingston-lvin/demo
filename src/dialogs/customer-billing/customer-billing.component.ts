import { Component, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ImageComponent } from '../../components/image/image.component';
import { environment } from '../../environments/environment.development';
import { CourierService } from '../../services/courier.service';

@Component({
  selector: 'app-customer-billing',
  templateUrl: './customer-billing.component.html',
  styleUrl: './customer-billing.component.scss',
  imports: [FormsModule, ReactiveFormsModule],
})
export class CustomerBillingComponent {
  form: FormGroup;
  dialogRef = inject(MatDialogRef<ImageComponent>);

  constructor(
    private fb: FormBuilder,
    private courierService: CourierService,
    private router: Router
  ) {
    this.form = this.fb.group({
      // name: [null, Validators.required],
      // mobileNo: [null, Validators.required],
      // landLineNo: [null, Validators.required],
      // email: [null, Validators.required],
      // designation: [null, Validators.required],
      // remark: [null, Validators.required],

      address: ['Plot No 88, Door No 4, Maraimalai Nagar', Validators.required],
      mobileNo: [9965999285, Validators.required],
      state: ['TamilNadu', Validators.required],
      city: ['Pudukkottai', Validators.required],
      pincode: [622003, Validators.required],
    });
  }

  submit() {
    this.close();
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

  close() {
    this.dialogRef.close(this.form.value);
  }
}
