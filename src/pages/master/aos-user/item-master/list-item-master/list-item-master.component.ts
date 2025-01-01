import { Component, OnInit } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Item } from '../../../../../interfaces/item';
import { MatIconModule } from '@angular/material/icon';
import { PaginatorComponent } from '../../../../../components/paginator/paginator.component';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';
@Component({
  selector: 'app-list-item-master',
  templateUrl: './list-item-master.component.html',
  styleUrl: './list-item-master.component.scss',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    PaginatorComponent,
    MatSelectModule,
    MatIconButton,
  ],
})
export class ListItemMasterComponent implements OnInit {
  items: Item[] = [];
  rows: number[] = [5, 10, 20];
  limit: number = this.rows[0];
  offset: number = 0;
  // how many pages to be displayed in paginator component
  size: number = 0;
  // indicates current page in the paginator component
  page: number = 0;
  records: number = 0;
  searchTxt!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  loadData() {}

  onSelectRow(event: any) {
    this.limit = +event.target.value;
  }

  navigate(targetPage: any) {
    this.page = targetPage;
    this.offset = targetPage - 1;
    this.loadData();
  }

  deleteItem(arg0: number) {
    throw new Error('Method not implemented.');
  }
  editItem(arg0: number) {
    throw new Error('Method not implemented.');
  }

  navigateToCreateNewItemPage() {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.aosUser,
      environment.item,
      environment.create,
    ]);
  }
}
