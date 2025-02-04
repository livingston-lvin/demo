import { Component, OnInit, signal } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Success } from '../../../../../constants/AppData';
import { CustomerBillingComponent } from '../../../../../dialogs/customer-billing/customer-billing.component';
import { CustomerContactComponent } from '../../../../../dialogs/customer-contact/customer-contact.component';
import { environment } from '../../../../../environments/environment.development';
import { ShortenPipe } from '../../../../../pipes/shorten.pipe';
import { CustomerService } from '../../../../../services/customer.service';
import { SnackbarService } from '../../../../../services/snackbar.service';

@Component({
  selector: 'app-edit-customer-master',
  templateUrl: './edit-customer-master.component.html',
  styleUrl: './edit-customer-master.component.scss',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    ShortenPipe,
    MatRippleModule,
  ],
})
export class EditCustomerMasterComponent implements OnInit {
  form: FormGroup;
  payments: string[] = ['Cash', 'Cheque', 'UPI'];
  paidBy: string[] = ['Customer', 'AOS'];
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  firstName = new FormControl();
  contacts: any[] = [];
  billings: any[] = [];
  id: number;
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private snackBarService: SnackbarService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      customerName: [null, Validators.required],
      customerLoginPageUrl: [null],
      email: [null, Validators.required],
      modeOfPayment: [null],
      shippingChargesPaidBy: [null, Validators.required],
      gstNo: [null, Validators.required],
      state: [null, Validators.required],
      city: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.customerService.getCustomer(this.id).subscribe(
      (res: any) => {
        const customer: any = res.customer;
        this.form.patchValue({
          customerName: customer.customerName,
          customerLoginPageUrl: customer.customerLoginPageUrl,
          email: customer.email,
          modeOfPayment: customer.modeOfPayment,
          shippingChargesPaidBy: customer.shippingChargesPaidBy,
          gstNo: customer.gstNo,
          state: customer.state,
          city: customer.city,
        });
        const contacts: any[] = res.contacts;
        contacts.forEach((contact) => this.contacts.push(contact));
        const billings: any[] = res.billings;
        billings.forEach((billing) => this.billings.push(billing));
      },
      (err) => {
        console.log(err);
      }
    );
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
    const value = this.form.value;
    const payload = {
      ...value,
      contacts: this.contacts,
      billings: this.billings,
    };
    console.log(payload);
    if (this.form.valid) {
      this.customerService.create(payload).subscribe(
        (res) => {
          this.snackBarService.openSnackBar({
            msg: 'User created successfully',
            type: Success,
          });
          setTimeout(() => {
            this.navigateToListUserPage();
          }, 3000);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      alert('Please fill all mandetory fields...');
    }
  }

  navigateToListUserPage() {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.customerMaster,
      environment.master,
      environment.list,
    ]);
  }

  openCustomerContactDialog() {
    const dialog = this.dialog.open(CustomerContactComponent, {
      width: '500px',
      height: '500px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: { mode: 'create' },
    });

    dialog.afterClosed().subscribe(
      (res) => {
        if (res) this.contacts.push(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editContact(contact: any, index: number) {
    const dialog = this.dialog.open(CustomerContactComponent, {
      width: '500px',
      height: '500px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: { mode: 'edit', contact },
    });

    dialog.afterClosed().subscribe(
      (res) => {
        if (res) {
          this.contacts.splice(index, 1, res);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openCustomerBillingDialog() {
    const dialog = this.dialog.open(CustomerBillingComponent, {
      width: '500px',
      height: '500px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: { mode: 'create' },
    });

    dialog.afterClosed().subscribe(
      (res) => {
        if (res) this.billings.push(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editBilling(billing: any, index: number) {
    const dialog = this.dialog.open(CustomerBillingComponent, {
      width: '500px',
      height: '500px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: { mode: 'edit', billing },
    });

    dialog.afterClosed().subscribe(
      (res) => {
        if (res) {
          this.billings.splice(index, 1, res);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  removeContacts(index: number) {
    this.contacts.splice(index, 1);
  }

  removeBillings(index: number) {
    this.billings.splice(index, 1);
  }
}
