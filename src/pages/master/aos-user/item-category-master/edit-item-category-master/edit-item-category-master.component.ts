import { Component, Inject, inject, OnInit } from '@angular/core';
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
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ItemCategoryService } from '../../../../../services/item-category.service';
import { CreateItemCategoryMasterComponent } from '../create-item-category-master/create-item-category-master.component';
import { Success } from '../../../../../constants/AppData';
import { SnackbarService } from '../../../../../services/snackbar.service';

@Component({
  selector: 'app-edit-item-category-master',
  templateUrl: './edit-item-category-master.component.html',
  styleUrl: './edit-item-category-master.component.scss',
  imports: [MatDialogTitle, MatDialogContent, FormsModule, ReactiveFormsModule],
})
export class EditItemCategoryMasterComponent implements OnInit {
  id: number;
  readonly dialogRef = inject(MatDialogRef<CreateItemCategoryMasterComponent>);
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private itemCategoryService: ItemCategoryService,
    private snackbarService: SnackbarService,
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
    this.itemCategoryService.getItemCategory(this.id).subscribe(
      (res) => {
        this.form.patchValue({ id: res.id, name: res.name });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  submit() {
    const value = this.form.value;
    this.itemCategoryService.updateItemCategory(value).subscribe(
      (res) => {
        this.snackbarService.openSnackBar({
          title:'Success',
          msg: 'Category udated succssfully!',
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
