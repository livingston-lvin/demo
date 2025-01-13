import { Component, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {MatRippleModule} from '@angular/material/core';
import { Success } from '../../../../../constants/AppData';
import { CustomerBillingComponent } from '../../../../../dialogs/customer-billing/customer-billing.component';
import { CustomerContactComponent } from '../../../../../dialogs/customer-contact/customer-contact.component';
import { environment } from '../../../../../environments/environment.development';
import { ShortenPipe } from '../../../../../pipes/shorten.pipe';
import { CustomerService } from '../../../../../services/customer.service';
import { SnackbarService } from '../../../../../services/snackbar.service';
@Component({
  selector: 'app-create-customer-master',
  templateUrl: './create-customer-master.component.html',
  styleUrl: './create-customer-master.component.scss',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    ShortenPipe,
    MatRippleModule
],
})
export class CreateCustomerMasterComponent {
  form: FormGroup;
  payments: string[] = ['Cash', 'Cheque', 'UPI'];
  paidBy: string[] = ['Customer', 'AOS'];
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  firstName = new FormControl();
  contacts: any[] = [
    {
      name: 'Livingston',
      mobileNo: 9965999285,
      landLineNo: '044 - 622001',
      email: 'livingstonlvin@gmail.com',
      designation: 'Sales Assistant',
      remark: 'This is the test remark',
    },
    {
      name: 'Livingston',
      mobileNo: 9965999285,
      landLineNo: '044 - 622001',
      email: 'livingstonlvin@gmail.com',
      designation: 'Sales Assistant',
      remark: 'This is the test remark',
    },
  ];
  billings: any[] = [];
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private snackBarService: SnackbarService,
    private dialog: MatDialog
  ) {
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
      environment.list,
    ]);
  }

  openCustomerContactDialog() {
    const dialog = this.dialog.open(CustomerContactComponent, {
      width: '500px',
      height: '500px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
    });

    dialog.afterClosed().subscribe(
      (res) => {
        this.contacts.push(res);
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
    });

    dialog.afterClosed().subscribe(
      (res) => {
        this.billings.push(res);
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
