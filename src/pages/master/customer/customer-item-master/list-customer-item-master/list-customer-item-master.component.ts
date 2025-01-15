import { Component } from '@angular/core';
import { TableComponent } from '../../../../../components/table/table.component';

@Component({
  selector: 'app-list-customer-item-master',
  templateUrl: './list-customer-item-master.component.html',
  styleUrl: './list-customer-item-master.component.scss',
  imports: [TableComponent],
})
export class ListCustomerItemMasterComponent {
  headers: string[] = [
    'S.No.',
    'Customer',
    'Items',
    'Action',
  ];
  addBtnTxt = 'Add Customer Item';
  module = ['Masters', 'Customer', 'Customer Item Master'];
}
