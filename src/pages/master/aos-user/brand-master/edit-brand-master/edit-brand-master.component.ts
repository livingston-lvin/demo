import { Component, inject, Inject, OnInit } from '@angular/core';
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
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BrandService } from '../../../../../services/brand.service';

@Component({
  selector: 'app-edit-brand-master',
  templateUrl: './edit-brand-master.component.html',
  styleUrl: './edit-brand-master.component.scss',
  imports: [
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class EditBrandMasterComponent implements OnInit {
  id: number;
  readonly dialogRef = inject(MatDialogRef<EditBrandMasterComponent>);
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.id = this.data.id;
    this.form = this.fb.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.brandService.getBrand(this.id).subscribe(
      (res) => {
        this.form.patchValue({ id: res.id, name: res.name });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.brandService.updateBrand(value).subscribe(
        (res) => {
          this.closeDialog();
        },
        (err) => {
          console.log(err);
        }
      );
      this.dialogRef.close();
    } else {
      alert('Please fill all mandetory fields...');
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
