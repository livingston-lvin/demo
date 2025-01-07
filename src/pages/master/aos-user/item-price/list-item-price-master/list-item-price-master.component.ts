import { Component } from '@angular/core';
import { TableComponent } from '../../../../../components/table/table.component';

@Component({
  selector: 'app-list-item-price-master',
  templateUrl: './list-item-price-master.component.html',
  styleUrl: './list-item-price-master.component.scss',
  imports: [TableComponent],
})
export class ListItemPriceMasterComponent {
  headers: string[] = [
    'S.No.',
    'Item Name',
    'Item Code',
    'Item Price',
    'Item HSN Code',
    'GST Rate',
    'GST Amount',
    'Final Price(Inc GST)',
    'Date Added',
    'Action',
  ];
  addBtnTxt = 'Add Item Price';
  module = ['Masters', 'AOS User', 'Item Price Master'];
}
