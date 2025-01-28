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
  sizeUnits: string[] = ['cm', 'inch', 'reams'];
  weightUnits: string[] = ['gm', 'kg'];
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
    private brandService: BrandService
  ) {
    this.form = this.fb.group({
      name: [null, Validators.required],
      code: [null, Validators.required],
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
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.itemCategoryService.getAll().subscribe(
      (res) => {
        this.categories = res;
      },
      (err) => {
        console.log(err);
      }
    );

    this.brandService.getAll().subscribe(
      (res) => {
        this.brands = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      const formData: FormData = new FormData();
      formData.append(
        'data',
        new Blob([JSON.stringify(value)], { type: 'application/json' })
      );
      formData.append('file', this.selectedFile!);
      this.itemService.create(formData).subscribe(
        (res) => {
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
