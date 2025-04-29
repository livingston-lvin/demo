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
import { CustomerItemService } from '../../../../../services/customer-item.service';
import { CustomerService } from '../../../../../services/customer.service';
import { ItemService } from '../../../../../services/item.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule, Location } from '@angular/common';
import { SnackbarService } from '../../../../../services/snackbar.service';
import { Success } from '../../../../../constants/AppData';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-edit-customer-item-master',
  templateUrl: './edit-customer-item-master.component.html',
  styleUrl: './edit-customer-item-master.component.scss',
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
  providers: [],
})
export class EditCustomerItemMasterComponent implements OnInit {
  form: FormGroup;
  items: any[] = [];
  categories: any[] = [];
  customers: any[] = [];
  id: number;
  filteredItems!: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private itemService: ItemService,
    private customerService: CustomerService,
    private customerItemService: CustomerItemService,
    private route: ActivatedRoute,
    private location: Location,
    private snackbarService: SnackbarService
  ) {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      customerItemId: this.id,
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
    const itemPromise = new Promise((resolve, reject) => {
      this.itemService.getValidItems().subscribe(
        (res: any[]) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });

    const customerPromise = new Promise((resolve, reject) => {
      this.customerService.getValidCustomers().subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });

    const customerItemPromise = new Promise((resolve, reject) => {
      this.customerItemService.getCustomerItem(this.id).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });

    itemPromise
      .then((res: any) => {
        this.items = res;
        this.filteredItems = this.form.get('item')!.valueChanges.pipe(
          startWith(''),
          map((value) =>
            typeof value === 'string' ? this._filter(value) : this.items
          )
        );
        return customerPromise;
      })
      .then((res: any) => {
        this.customers = res;
        return customerItemPromise;
      })
      .then((res: any) => {
        let item = this.items.find((item) => +item.field === +res.itemId);
        let customer = this.customers.find(
          (customer) => customer.field === res.customerId
        );
        this.form.patchValue({
          item: item,
          customer: customer.value,
          itemAliasName: res.itemName,
          itemAliasCode: res.itemCode,
          itemPrice: res.itemPrice,
          minOrderQty: res.minOrderQty,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  submit() {
    const value = this.form.value;
    const payload = {
      id: this.id,
      itemCode: value.itemAliasCode,
      itemName: value.itemAliasName,
      itemPrice: value.itemPrice,
      minOrderQty: value.minOrderQty,
    };
    this.customerItemService.updateCustomerItem(payload).subscribe(
      (res) => {
        this.snackbarService.openSnackBar({
          title: Success,
          msg: 'Item updated successfully!',
          type: Success,
        });
        this.navigateToListCustomerItemPage();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  navigateToListCustomerItemPage() {
    this.location.back();
  }

  displayFn(value: any) {
    return value ? value.value : '';
  }
}
