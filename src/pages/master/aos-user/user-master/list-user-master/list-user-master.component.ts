import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from '../../../../../components/table/table.component';

@Component({
  selector: 'app-list-user-master',
  templateUrl: './list-user-master.component.html',
  styleUrl: './list-user-master.component.scss',
  imports: [MatIconModule, TableComponent],
})
export class ListUserMasterComponent {
  headers: string[] = [
    'S.No.',
    'First Name',
    'Middle Name',
    'Last Name',
    'Email',
    'Mobile No',
    'Role',
    'Date Added',
    'Action',
  ];
  addBtnTxt = 'Add User';
  module = ['Masters', 'AOS User', 'User Master'];
}
