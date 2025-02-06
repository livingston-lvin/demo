import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { ItemCategoryService } from '../../../../../services/item-category.service';
import { Success } from '../../../../../constants/AppData';
import { SnackbarService } from '../../../../../services/snackbar.service';

@Component({
  selector: 'app-create-item-category-master',
  templateUrl: './create-item-category-master.component.html',
  styleUrl: './create-item-category-master.component.scss',
  imports: [MatDialogTitle, MatDialogContent, FormsModule, ReactiveFormsModule],
})
export class CreateItemCategoryMasterComponent {
  readonly dialogRef = inject(MatDialogRef<CreateItemCategoryMasterComponent>);
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private itemCategoryService: ItemCategoryService,
    private snackbarService: SnackbarService
  ) {
    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
    });
  }

  submit() {
    const value = this.form.value;
    this.itemCategoryService.createItemCategory(value).subscribe(
      (res) => {
        this.snackbarService.openSnackBar({
          title:'Success',
          msg: 'Category added succssfully!',
          type: Success,
        });
        this.closeDialog(Success);
      },
      (err) => {
        console.log(err);
        this.closeDialog(err);
      }
    );
  }

  closeDialog(status: any) {
    this.dialogRef.close(status);
  }
}
