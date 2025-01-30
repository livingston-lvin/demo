import { Component, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { BrandService } from '../../../../../services/brand.service';
import { SnackbarService } from '../../../../../services/snackbar.service';
import { Success } from '../../../../../constants/AppData';

@Component({
  selector: 'app-create-brand-master',
  templateUrl: './create-brand-master.component.html',
  styleUrl: './create-brand-master.component.scss',
  imports: [MatDialogTitle, MatDialogContent, FormsModule, ReactiveFormsModule],
})
export class CreateBrandMasterComponent {
  readonly dialogRef = inject(MatDialogRef<CreateBrandMasterComponent>);
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    private snackbarService: SnackbarService
  ) {
    this.form = this.fb.group({
      name: [null, Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.brandService.create(value).subscribe(
        (res) => {
          this.snackbarService.openSnackBar({
            msg: 'Brand added succssfully!',
            type: Success,
          });
          this.closeDialog();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
