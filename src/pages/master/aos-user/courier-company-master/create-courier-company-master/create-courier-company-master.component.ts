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
import { CourierService } from '../../../../../services/courier.service';

@Component({
  selector: 'app-create-courier-company-master',
  templateUrl: './create-courier-company-master.component.html',
  styleUrl: './create-courier-company-master.component.scss',
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class CreateCourierCompanyMasterComponent {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private courierService: CourierService,
    private router: Router
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
}
