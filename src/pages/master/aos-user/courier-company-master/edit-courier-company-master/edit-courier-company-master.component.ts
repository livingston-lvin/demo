import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';
import { CourierService } from '../../../../../services/courier.service';

@Component({
  selector: 'app-edit-courier-company-master',
  templateUrl: './edit-courier-company-master.component.html',
  styleUrl: './edit-courier-company-master.component.scss',
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class EditCourierCompanyMasterComponent implements OnInit {
  form: FormGroup;
  id: number;
  constructor(
    private fb: FormBuilder,
    private courierService: CourierService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      id: [null, Validators.required],
      companyName: [null, Validators.required],
      mobileNo: [null, Validators.required],
      contactPerson: [null, Validators.required],
      trackingWebsite: [null, Validators.required],
      email: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.courierService.getCourier(this.id).subscribe(
      (res) => {
        this.form.patchValue({
          id: res.id,
          companyName: res.companyName,
          mobileNo: res.mobileNo,
          contactPerson: res.contactPerson,
          trackingWebsite: res.trackingWebsite,
          email: res.email,
        });
      },
      (err) => {
        console.log(err);
      }
    );
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
