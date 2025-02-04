import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';
import { UserService } from '../../../../../services/user.service';
import { SnackbarService } from '../../../../../services/snackbar.service';
import { Success } from '../../../../../constants/AppData';

@Component({
  selector: 'app-edit-user-master',
  templateUrl: './edit-user-master.component.html',
  styleUrl: './edit-user-master.component.scss',
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class EditUserMasterComponent implements OnInit {
  form: FormGroup;
  id: number;
  roles: string[] = ['Super Admin', 'Back Office'];
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBarService: SnackbarService
  ) {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      id: [null, Validators.required],
      firstName: [null, Validators.required],
      middleName: [null],
      lastName: [null],
      email: [null, Validators.required],
      mobileNo: [null, Validators.required],
      role: [null, Validators.required],
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

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.userService.getUser(this.id).subscribe(
      (res) => {
        this.form.patchValue({
          id: res.id,
          firstName: res.firstName,
          middleName: res.middleName,
          lastName: res.lastName,
          email: res.email,
          mobileNo: res.mobileNo,
          role: res.role,
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
      this.userService.updateUser(value).subscribe(
        (res) => {
          this.snackBarService.openSnackBar({
            msg: 'User updated successfully!',
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
