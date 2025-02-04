import { Component, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';
import { UserService } from '../../../../../services/user.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Success } from '../../../../../constants/AppData';
import { SnackbarService } from '../../../../../services/snackbar.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-user-master',
  templateUrl: './create-user-master.component.html',
  styleUrl: './create-user-master.component.scss',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class CreateUserMasterComponent {
  form: FormGroup;
  roles: string[] = ['Super Admin', 'Back Office'];
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  firstName = new FormControl();
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBarService: SnackbarService
  ) {
    this.form = this.fb.group({
      firstName: [null, Validators.required],
      middleName: [null],
      lastName: [null],
      email: [null, Validators.required],
      mobileNo: [
        null,
        [
          Validators.required,
          Validators.pattern(/^\d+$/),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      role: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    });
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

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.userService.create(value).subscribe(
        (res) => {
          this.snackBarService.openSnackBar({
            msg: 'User created successfully!',
            type: Success,
          });
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
