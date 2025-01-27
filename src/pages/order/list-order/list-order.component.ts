import { Component } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.scss',
  imports: [TableComponent],
})
export class ListOrderComponent {
  headers: string[] = [
    'S.No.',
    'Customer Id',
    'Customer Name',
    'Order No',
    'Order Date',
    'Action',
  ];
  addBtnTxt = '';
  module = ['Orders'];
}
