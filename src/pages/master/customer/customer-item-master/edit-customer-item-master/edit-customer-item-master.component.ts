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
import { Location } from '@angular/common';
import { SnackbarService } from '../../../../../services/snackbar.service';
import { Success } from '../../../../../constants/AppData';

@Component({
  selector: 'app-edit-customer-item-master',
  templateUrl: './edit-customer-item-master.component.html',
  styleUrl: './edit-customer-item-master.component.scss',
  imports: [FormsModule, ReactiveFormsModule],
  providers: [],
})
export class EditCustomerItemMasterComponent implements OnInit {
  form: FormGroup;
  items: any[] = [];
  categories: any[] = [];
  customers: any[] = [];
  id: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private itemService: ItemService,
    private customerService: CustomerService,
    private customerItemService: CustomerItemService,
    private route: ActivatedRoute,
    private location: Location,
    private snackbarService: SnackbarService,
  ) {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      customerItemId: this.id,
      item: [null, Validators.required],
      customer: [null, Validators.required],
      aliasItemName: [null, Validators.required],
      aliasItemCode: [null, Validators.required],
      aliasItemPrice: [null, Validators.required],
    });
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
        return customerPromise;
      })
      .then((res: any) => {
        this.customers = res;
        return customerItemPromise;
      })
      .then((res: any) => {
        let item = this.items.filter((item) => item.field === res.itemId)[0];
        let customer = this.customers.filter(
          (customer) => customer.field === res.customerId
        )[0];
        this.form.patchValue({
          item: item.value,
          customer: customer.value,
          aliasItemName: res.itemName,
          aliasItemCode: res.itemCode,
          aliasItemPrice: res.itemPrice,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  submit() {
    // const value = this.form.value;
    // this.customerItemService.updateCustomerItem(value).subscribe(
    //   (res) => {

    //     this.navigateToListCustomerItemPage();
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
    // this.snackbarService.openSnackBar({
    //   title: Success,
    //   msg: 'Item updated successfully!',
    //   type: Success,
    // });
    // return;
  }

  navigateToListCustomerItemPage() {
    this.location.back();
  }

}
