import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ItemService } from '../../../../../services/item.service';
import { ItemCategory } from '../../../../../interfaces/item-category';
import { ItemCategoryService } from '../../../../../services/item-category.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';
import { MatIconModule } from '@angular/material/icon';
import { Brand } from '../../../../../interfaces/brand';
import { BrandService } from '../../../../../services/brand.service';
import { MatButtonModule } from '@angular/material/button';
import { GstService } from '../../../../../services/gst.service';
import { Gst } from '../../../../../interfaces/gst';
import { SnackbarService } from '../../../../../services/snackbar.service';
import { Error, Success, Warning } from '../../../../../constants/AppData';

@Component({
  selector: 'app-create-item-master',
  templateUrl: './create-item-master.component.html',
  styleUrl: './create-item-master.component.scss',
  imports: [FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
})
export class CreateItemMasterComponent implements OnInit {
  form: FormGroup;
  selectedCategory!: ItemCategory;
  selectedFile: File | undefined;
  categories: ItemCategory[] = [];
  brands: Brand[] = [];
  gsts: Gst[] = [];
  sizeUnits: string[] = ['cm', 'inch', 'reams'];
  weightUnits: string[] = ['Gm', 'Kg'];
  packingUnits: string[] = [
    'Bottle',
    'Box',
    'File',
    'Nos',
    'Pcs',
    'Pkts',
    'Reams',
    'Set',
  ];

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private itemCategoryService: ItemCategoryService,
    private router: Router,
    private brandService: BrandService,
    private gstService: GstService,
    private snackBarService: SnackbarService
  ) {
    this.form = this.fb.group({
      name: [null, Validators.required],
      category: [null, Validators.required],
      weight: [null, Validators.required],
      weightUnit: [null, Validators.required],
      packingQty: [null, Validators.required],
      packingUnit: [null, Validators.required],
      minOrderQty: [null, Validators.required],
      brand: [null, Validators.required],
      attribute: [null, Validators.required],
      hsnCode: [null, Validators.required],
      gst: [null, Validators.required],
    });
  }

  open(type:string) {
    this.snackBarService.openSnackBar({
      msg: 'Item successfully saved.',
      type: type,
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const itemPromise = new Promise((resolve, rej) => {
      this.itemCategoryService.getAll().subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          rej(err);
        }
      );
    });

    const brandPromise = new Promise((resolve, rej) => {
      this.brandService.getAll().subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          rej(err);
        }
      );
    });

    const gstPromise = new Promise((resolve, rej) => {
      this.gstService.getValidGsts().subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          rej(err);
        }
      );
    });

    itemPromise
      .then((res: any) => {
        this.categories = res;
        return brandPromise;
      })
      .then((res: any) => {
        this.brands = res;
        return gstPromise;
      })
      .then((res: any) => {
        this.gsts = res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  submit() {
    if (!this.selectedFile) {
      this.snackBarService.openSnackBar({
        msg: 'Please select item image',
        type: Warning,
      });
      return;
    }
    if (this.form.valid) {
      const value = this.form.value;
      const formData: FormData = new FormData();
      formData.append(
        'data',
        new Blob([JSON.stringify(value)], { type: 'application/json' })
      );
      formData.append('file', this.selectedFile!);
      this.itemService.create(formData).subscribe(
        (_) => {
          this.snackBarService.openSnackBar({
            msg: 'Item created...',
            type: Success,
          });
          this.navigateToListItemPage();
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      alert('Please fill all mandetory fields...');
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  removeFile() {
    this.selectedFile = undefined;
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  navigateToListItemPage() {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.aosUser,
      environment.item,
      environment.list,
    ]);
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
}
