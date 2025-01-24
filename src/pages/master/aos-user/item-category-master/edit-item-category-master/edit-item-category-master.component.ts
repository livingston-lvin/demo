import { Component, Inject, inject, OnInit } from '@angular/core';
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
import { ItemCategoryService } from '../../../../../services/item-category.service';
import { CreateItemCategoryMasterComponent } from '../create-item-category-master/create-item-category-master.component';

@Component({
  selector: 'app-edit-item-category-master',
  templateUrl: './edit-item-category-master.component.html',
  styleUrl: './edit-item-category-master.component.scss',
  imports: [
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class EditItemCategoryMasterComponent implements OnInit {
  id: number;
  readonly dialogRef = inject(MatDialogRef<CreateItemCategoryMasterComponent>);
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private itemCategoryService: ItemCategoryService,
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
    if (this.form.valid) {
      const value = this.form.value;
      this.itemCategoryService.updateItemCategory(value).subscribe(
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
