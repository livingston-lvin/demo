import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ItemCategoryService } from '../../../../../services/item-category.service';

@Component({
  selector: 'app-create-item-category-master',
  templateUrl: './create-item-category-master.component.html',
  styleUrl: './create-item-category-master.component.scss',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
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
          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      alert('Please fill all mandetory fields...');
    }
  }
}
