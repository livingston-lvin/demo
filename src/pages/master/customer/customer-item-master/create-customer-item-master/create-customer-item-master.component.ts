import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-create-customer-item-master',
  templateUrl: './create-customer-item-master.component.html',
  styleUrl: './create-customer-item-master.component.scss',
  imports: [FormsModule, ReactiveFormsModule],
})
export class CreateCustomerItemMasterComponent implements OnInit {
  form: FormGroup;
  items: any[] = [];
  categories: any[] = [];
  customers: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private itemService: ItemService,
    private customerService: CustomerService
  ) {
    this.form = this.fb.group({
      item: [null, Validators.required],
      category: [null],
      customer: [null, Validators.required],
      customerItemAlias: [null],
      customerItemCode: [null, Validators.required],
      customerItemPrice: [null, Validators.required],
      itemHsnCode: [null, Validators.required],
      priceIncGST: [null, Validators.required],
      gst: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.itemService.getValidItems().subscribe(
      (res: any[]) => {
        this.items = res;
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

  onSelect(event: any) {
    const itemId: number = +event.target.value;
    console.log(itemId);
    const item: any = this.items.filter((item) => item.id === itemId)[0];
    console.log(item);
    const category = item.category
    this.form.patchValue({
      category:category.name
    })
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

  submit() {
    // const value = this.form.value;
    // const payload = {
    //   ...value,
    //   contacts: this.contacts,
    //   billings: this.billings,
    // };
    // console.log(payload);
    // if (this.form.valid) {
    //   this.customerService.create(payload).subscribe(
    //     (res) => {
    //       this.snackBarService.openSnackBar({
    //         msg: 'User created successfully',
    //         type: Success,
    //       });
    //       setTimeout(() => {
    //         this.navigateToListUserPage();
    //       }, 3000);
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    // } else {
    //   alert('Please fill all mandetory fields...');
    // }
  }

  navigateToListUserPage() {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.customerMaster,
      environment.list,
    ]);
  }
}
