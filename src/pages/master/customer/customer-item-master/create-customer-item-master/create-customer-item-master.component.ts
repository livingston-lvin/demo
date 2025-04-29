import { Component, OnInit, signal } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';
import { ItemService } from '../../../../../services/item.service';
import { CustomerService } from '../../../../../services/customer.service';
import { CustomerItemService } from '../../../../../services/customer-item.service';
import { map, Observable, startWith, tap } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-create-customer-item-master',
  templateUrl: './create-customer-item-master.component.html',
  styleUrl: './create-customer-item-master.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
})
export class CreateCustomerItemMasterComponent implements OnInit {
  form: FormGroup;
  items: any[] = [];
  categories: any[] = [];
  customers: any[] = [];
  filteredItems!: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private itemService: ItemService,
    private customerService: CustomerService,
    private customerItemService: CustomerItemService
  ) {
    this.form = this.fb.group({
      item: [null, Validators.required],
      customer: [null, Validators.required],
      itemAliasName: [null, Validators.required],
      itemAliasCode: [null, Validators.required],
      itemPrice: [null, Validators.required],
      minOrderQty: [null, Validators.required],
    });
  }

  private _filter(value: string): any[] {
    return this.items.filter((item: any) =>
      item.value.toLowerCase().includes(value.toLowerCase())
    );
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.itemService.getValidItems().subscribe(
      (res: any[]) => {
        this.items = res;
        this.filteredItems = this.form.get('item')!.valueChanges.pipe(
          startWith(''),
          map((value) =>
            typeof value === 'string' ? this._filter(value) : this.items
          )
        );
      },
      (err) => {
        console.log(err);
      }
    );

    this.customerService.getValidCustomers().subscribe(
      (res) => {
        this.customers = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  submit() {
    const value = this.form.value;
    const payload = {
      itemId: +value.item.field,
      customerId: +value.customer,
      itemCode: value.itemAliasCode,
      itemName: value.itemAliasName,
      itemPrice: value.itemPrice,
      minOrderQty: value.minOrderQty,
    };
    if (this.form.valid) {
      this.customerItemService.create(payload).subscribe(
        (res) => {
          this.navigateToListCustomerItemPage();
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      alert('Please fill all mandetory fields...');
    }
  }

  navigateToListCustomerItemPage() {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.customerMaster,
      environment.item,
      environment.list,
    ]);
  }

  displayFn(value: any) {
    return value ? value.value : '';
  }
}
