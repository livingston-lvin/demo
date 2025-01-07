import { Component } from '@angular/core';
import { TableComponent } from '../../../../../components/table/table.component';

@Component({
  selector: 'app-list-gst-rate-master',
  templateUrl: './list-gst-rate-master.component.html',
  styleUrl: './list-gst-rate-master.component.scss',
  imports: [TableComponent],
})
export class ListGstRateMasterComponent {
  headers: string[] = [
    'S.No.',
    'GST Rate',
    'Applicable Date',
    'Is Active',
    'Date Added',
    'Action',
  ];
  addBtnTxt = 'Add Gst Rate';
  module = ['Masters', 'AOS User', 'Gst Rate Master'];
}
