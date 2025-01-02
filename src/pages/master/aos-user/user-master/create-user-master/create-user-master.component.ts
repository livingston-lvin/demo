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
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-create-user-master',
  templateUrl: './create-user-master.component.html',
  styleUrl: './create-user-master.component.scss',
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class CreateUserMasterComponent {
  form: FormGroup;
  roles: string[] = ['Super Admin', 'Back Office'];
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.fb.group({
      firstName: [null, Validators.required],
      middleName: [null],
      lastName: [null],
      email: [null, Validators.required],
      mobileNo: [null, Validators.required],
      role: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.userService.create(value).subscribe(
        (res) => {
          this.navigateToListUserPage();
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      alert('Please fill all mandetory fields...');
    }
  }

  navigateToListUserPage() {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.aosUser,
      environment.user,
      environment.list,
    ]);
  }
}
