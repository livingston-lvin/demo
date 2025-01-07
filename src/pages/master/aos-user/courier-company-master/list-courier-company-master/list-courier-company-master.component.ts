import { Component } from '@angular/core';
import { TableComponent } from '../../../../../components/table/table.component';

@Component({
  selector: 'app-list-courier-company-master',
  templateUrl: './list-courier-company-master.component.html',
  styleUrl: './list-courier-company-master.component.scss',
  imports: [TableComponent],
})
export class ListCourierCompanyMasterComponent {
  headers: string[] = [
    'S.No.',
    'Company Name',
    'Contact Person Name',
    'Email',
    'Tracking Website',
    'Mobile No',
    'Date Added',
    'Action',
  ];
  addBtnTxt = 'Add Courier';
  module = ['Masters', 'AOS User', 'Courier Company Master'];
}
