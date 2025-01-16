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

@Component({
  selector: 'app-edit-customer-item-master',
  templateUrl: './edit-customer-item-master.component.html',
  styleUrl: './edit-customer-item-master.component.scss',
  imports: [FormsModule, ReactiveFormsModule],
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
    private http: HttpClient
  ) {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      item: [null, Validators.required],
      customer: [null, Validators.required],
      itemName: [null],
      itemCode: [null, Validators.required],
      itemPrice: [null, Validators.required],
      // itemHsnCode: [null, Validators.required],
      // priceIncGST: [null, Validators.required],
      // gst: [null, Validators.required],
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
          item: item.field,
          customer: customer.field,
          itemName: res.itemName,
          itemCode: res.itemCode,
          itemPrice: res.itemPrice,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onSelect(event: any) {
    // const itemId: number = +event.target.value;
    // console.log(itemId);
    // const item: any = this.items.filter((item) => item.id === itemId)[0];
    // console.log(item);
    // const category = item.category;
    // this.form.patchValue({
    //   category: category.name,
    //   gst: item.gst,
    //   itemHsnCode: item.hsnCode,
    // });
  }

  validateNumberInput(event: any): void {
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
    const val = +event.target!.value;
    if (val && this.form.get('item')?.value) {
      this.form.patchValue({
        priceIncGST: val * (1 + this.form.get('gst')?.value / 100),
      });
    }
  }

  submit() {
    const value = this.form.value;
    const payload = {
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
}
