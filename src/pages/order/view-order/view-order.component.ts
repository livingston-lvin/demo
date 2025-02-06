import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { OrderService } from '../../../services/order.service';

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
  id: number;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      items: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.orderService.getOrderDetail(this.id).subscribe(
      (res) => {
        res.forEach((r: any) => this.addItem(r));
      },
      (err) => {
        console.log(err);
      }
    );
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addItem(data: any): void {
    const itemGroup = this.fb.group({
      itemName: [data.itemName],
      qty: [data.qty],
      remark: [data.remark],
      address: [data.address],
    });
    this.items.push(itemGroup);
  }

  navigateToListStationery() {
    this.router.navigate([environment.servletPath, environment.order, 'list']);
  }
}
