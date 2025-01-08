import { Component } from '@angular/core';
import { TableComponent } from '../../../../../components/table/table.component';

@Component({
  selector: 'app-list-brand-master',
  templateUrl: './list-brand-master.component.html',
  styleUrl: './list-brand-master.component.scss',
  imports: [TableComponent],
})
export class ListBrandMasterComponent {
  headers: string[] = [
    'S.No.',
    'Brand Name',
    'Date Added',
    'Action',
  ];
  addBtnTxt = 'Add Brand';
  module = ['Masters', 'AOS User', 'Brand Master'];
}
