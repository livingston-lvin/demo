import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../../../services/auth.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { Error } from '../../../constants/AppData';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [FormsModule, ReactiveFormsModule],
})
export class LoginComponent {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
    this.form = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
    localStorage.clear();
  }

  submit() {
    const payload = {
      code: this.form.value.email,
      password: this.form.value.password,
    };
    this.authService.login(payload).subscribe(
      (res) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate([environment.servletPath]);
      },
      (err) => {
        console.log(err);
        this.snackbarService.openSnackBar({
          title: 'Error',
          msg: err.error,
          type: Error,
        });
      }
    );
  }
}
