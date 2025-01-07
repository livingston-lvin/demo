import { Component } from '@angular/core';
import { TableComponent } from '../../../../../components/table/table.component';

@Component({
  selector: 'app-list-item-category-master',
  templateUrl: './list-item-category-master.component.html',
  styleUrl: './list-item-category-master.component.scss',
  imports: [TableComponent],
})
export class ListItemCategoryMasterComponent {
  headers: string[] = ['S.No.', 'Category Name', 'Date Added', 'Action'];
  addBtnTxt = 'Add Item Category';
  module = ['Masters', 'AOS User', 'Item Category Master'];
}
