import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
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
import { Gst } from '../../../../../interfaces/gst';
import { GstService } from '../../../../../services/gst.service';
import { SnackbarService } from '../../../../../services/snackbar.service';
import { Success, Warning } from '../../../../../constants/AppData';

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
  selectedFile = signal<File | null>(null);
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  categories: ItemCategory[] = [];
  sizeUnits: string[] = ['cm', 'inch', 'reams'];
  weightUnits: string[] = ['Gm', 'Kg'];
  gsts: Gst[] = [];
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
    private brandService: BrandService,
    private gstService: GstService,
    private snackBarService: SnackbarService
  ) {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      category: [null, Validators.required],
      weight: [null, Validators.required],
      weightUnit: [null, Validators.required],
      packingQty: [null, Validators.required],
      packingUnit: [null, Validators.required],
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
    const itemCategoryPromise = new Promise((resolve, rej) => {
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

    const itemPromise = new Promise((resolve, rej) => {
      this.itemService.get(this.id).subscribe(
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

    itemCategoryPromise
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
        return itemPromise;
      })
      .then((res: any) => {
        this.form.patchValue({
          id: res.id,
          name: res.name,
          category: res.category,
          weight: res.weight,
          weightUnit: res.weightUnit,
          packingQty: res.packingQty,
          packingUnit: res.packingUnit,
          attribute: res.attribute,
          brand: res.brand,
          hsnCode: res.hsnCode,
          gst: res.gst,
        });
        if (res.fileName) {
          this.selectedFile.set(new File([], res.fileName));
        } else {
          this.resetFileInput()
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  submit(mode: string) {
    if (!this.selectedFile) {
      this.snackBarService.openSnackBar({
        title: 'Warning',
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

      if (this.selectedFile && this.selectedFile()!.size > 0) {
        formData.append('file', this.selectedFile()!);
      }

      this.itemService.update(formData).subscribe(
        (_) => {
          this.snackBarService.openSnackBar({
            title: 'Success',
            msg: 'Item updated',
            type: Success,
          });
          if (mode === 'save') {
            this.navigateToListItemPage();
          } else if (mode === 'next') {
            this.router.navigate([
              environment.servletPath,
              environment.master,
              environment.aosUser,
              environment.item,
              environment.edit,
              this.id + 1,
            ]);
            this.id = this.id + 1;
            this.loadData();
          }
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
    console.log(event);
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile.set(file);
    }
  }

  resetFileInput(): void {
    this.selectedFile.set(null); 
    this.fileInput.nativeElement.value = ''; 
  }

  removeFile() {
    this.resetFileInput()
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
