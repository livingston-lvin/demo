import { Component, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  MatDialogActions,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { BrandService } from '../../../../../services/brand.service';

@Component({
  selector: 'app-create-brand-master',
  templateUrl: './create-brand-master.component.html',
  styleUrl: './create-brand-master.component.scss',
  imports: [
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CreateBrandMasterComponent {
  readonly dialogRef = inject(MatDialogRef<CreateBrandMasterComponent>);
    form: FormGroup;
    constructor(
      private fb: FormBuilder,
      private brandService: BrandService,
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
            this.closeDialog();
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        alert('Please fill all mandetory fields...');
      }
    }
  
    closeDialog() {
      this.dialogRef.close();
    }
}
