import { Component, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { CourierService } from '../../services/courier.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ImageComponent } from '../../components/image/image.component';

@Component({
  selector: 'app-customer-contact',
  templateUrl: './customer-contact.component.html',
  styleUrl: './customer-contact.component.scss',
  imports: [FormsModule, ReactiveFormsModule],
})
export class CustomerContactComponent {
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

      name: ['Livingston', Validators.required],
      mobileNo: [9965999285, Validators.required],
      landLineNo: ['044 - 622001', Validators.required],
      email: ['livingstonlvin@gmail.com', Validators.required],
      designation: ['Sales Assistant', Validators.required],
      remark: ['This is the test remark', Validators.required],
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
