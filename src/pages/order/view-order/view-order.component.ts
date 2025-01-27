import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { ItemService } from '../../../services/item.service';
import { OrderService } from '../../../services/order.service';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.scss',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
})
export class ViewOrderComponent implements OnInit {
  form: FormGroup;
  products: any[] = [];
  id: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBarService: SnackbarService,
    private itemService: ItemService,
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      items: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.itemService.getAll().subscribe(
      (res) => {
        this.products = res;
        this.orderService.getOrderDetail(this.id).subscribe(
          (res) => {
            res.forEach((r: any) => this.addItem(r));
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addItem(data: any | null): void {
    const selectedProduct = data
      ? this.products.find((product) => product.id === Number(data.productId))
      : null;

    const itemGroup = this.fb.group({
      item: [
        selectedProduct
          ? selectedProduct.code + ' - ' + selectedProduct.name
          : null,
        Validators.required,
      ],
      itemName: [selectedProduct ? selectedProduct.itemName : null],
      qty: [data?.qty ?? null, [Validators.required, Validators.min(1)]],
      remark: [data?.remark ?? null, Validators.required],
      address: [data?.address ?? null, Validators.required],
    });

    this.items.push(itemGroup);
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  navigateToListStationery() {
    this.router.navigate([environment.servletPath, environment.order, 'list']);
  }
}
