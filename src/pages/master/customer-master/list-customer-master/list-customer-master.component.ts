import { Component } from '@angular/core';
import { TableComponent } from '../../../../components/table/table.component';

@Component({
  selector: 'app-list-customer-master',
  templateUrl: './list-customer-master.component.html',
  styleUrl: './list-customer-master.component.scss',
  imports: [TableComponent],
})
export class ListCustomerMasterComponent {
  headers: string[] = [
    'S.No.',
    'Full Name',
    'Contact Person',
    'Code',
    'Login Page',
    'Contact No',
    'Contact Person',
    'Entity Image',
    'Action',
  ];
  addBtnTxt = 'Add Customer';
  module = ['Masters', 'Customer Master'];
}
