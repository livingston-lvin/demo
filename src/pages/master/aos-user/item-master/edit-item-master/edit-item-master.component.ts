import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';
import { ItemCategory } from '../../../../../interfaces/item-category';
import { ItemCategoryService } from '../../../../../services/item-category.service';
import { ItemService } from '../../../../../services/item.service';
import { Item } from '../../../../../interfaces/item';
import { Brand } from '../../../../../interfaces/brand';
import { BrandService } from '../../../../../services/brand.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-item-master',
  templateUrl: './edit-item-master.component.html',
  styleUrl: './edit-item-master.component.scss',
  imports: [FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
})
export class EditItemMasterComponent implements OnInit {
  id: number;
  item!: Item;
  form: FormGroup;
  brands: Brand[] = [];
  selectedFile: File | undefined;
  categories: ItemCategory[] = [];
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
    private route: ActivatedRoute,
    private brandService: BrandService
  ) {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      id: [null, Validators.required],
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
    this.itemService.get(this.id).subscribe(
      (res) => {
        this.item = res;
        this.selectedFile = new File([], res.fileData.name);
        const category = this.categories.filter(
          (category) => category.id === res.category.id
        )[0];
        const brand = this.brands.filter(
          (brand) => brand.id === res.brand.id
        )[0];
        console.log(category, brand);
        this.form.patchValue({
          id: res.id,
          name: res.name,
          code: res.code,
          category: category.id,
          weight: res.weight,
          weightUnit: res.weightUnit,
          packingQty: res.packingQty,
          packingUnit: res.packingUnit,
          minOrderQty: res.minOrderQty,
          attribute: res.attribute,
          brand: brand.id,
          hsnCode: res.hsnCode,
          gst: res.gst,
        });
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
      this.itemService.update(formData).subscribe(
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
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file;
    }
  }

  removeFile() {
    this.selectedFile = undefined;
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
}
