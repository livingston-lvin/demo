import { Component, Inject, inject, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ItemCategoryService } from '../../../../../services/item-category.service';
import { CreateItemCategoryMasterComponent } from '../create-item-category-master/create-item-category-master.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-item-category-master',
  templateUrl: './edit-item-category-master.component.html',
  styleUrl: './edit-item-category-master.component.scss',
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
export class EditItemCategoryMasterComponent implements OnInit {
  id: number;
  readonly dialogRef = inject(MatDialogRef<CreateItemCategoryMasterComponent>);
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private itemCategoryService: ItemCategoryService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    // this.id = +this.route.snapshot.paramMap.get('id')!;
    this.id = data.id;
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
          console.log(res);
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
}
