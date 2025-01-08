import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogActions,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { ItemCategoryService } from '../../../../../services/item-category.service';

@Component({
  selector: 'app-create-item-category-master',
  templateUrl: './create-item-category-master.component.html',
  styleUrl: './create-item-category-master.component.scss',
  imports: [
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CreateItemCategoryMasterComponent {
  readonly dialogRef = inject(MatDialogRef<CreateItemCategoryMasterComponent>);
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private itemCategoryService: ItemCategoryService
  ) {
    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.itemCategoryService.createItemCategory(value).subscribe(
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
