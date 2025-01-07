import { Component } from '@angular/core';
import { TableComponent } from '../../../../../components/table/table.component';
@Component({
  selector: 'app-list-item-master',
  templateUrl: './list-item-master.component.html',
  styleUrl: './list-item-master.component.scss',
  imports: [TableComponent],
})
export class ListItemMasterComponent  {
  headers: string[] = [
    'S.No.',
            'Item Name',
            'Item Code',
            'Category',
            'Item Image',
            'Date Added',
            'Action',
  ];
  addBtnTxt = 'Add Item';
  module = ['Masters', 'AOS User', 'Item Master'];
}
