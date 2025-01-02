import { Component, computed, OnInit, signal } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Item } from '../../../../../interfaces/item';
import { MatIconModule } from '@angular/material/icon';
import { PaginatorComponent } from '../../../../../components/paginator/paginator.component';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';
import { ItemService } from '../../../../../services/item.service';
import { CommonModule } from '@angular/common';
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
    CommonModule,
  ],
})
export class ListItemMasterComponent implements OnInit {
  items: any[] = [];
  rows: number[] = [5, 10, 20];
  limit = signal(this.rows[0]);
  offset = signal(0);
  // how many pages to be displayed in paginator component
  size: number = 0;
  // indicates current page in the paginator component
  page: number = 0;
  records: number = 0;
  searchTxt!: string;
  from = computed(() => this.offset() * this.limit() + 1);
  to = computed(() => this.offset() * this.limit() + this.limit());

  constructor(private router: Router, private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.itemService.getAll(this.limit(), this.offset()).subscribe(
      (res) => {
        this.items = res.content;
        this.size = +res.totalPages;
        this.records = +res.totalElements;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSelectRow(event: any) {
    this.limit.set(+event.target.value);
  }

  navigate(targetPage: any) {
    this.page = targetPage;
    this.offset.set(targetPage - 1);
    this.loadData();
  }

  editItem(id: number) {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.aosUser,
      environment.item,
      environment.edit,
      id,
    ]);
  }

  deleteItem(id: number) {
    this.itemService.delete(id).subscribe(
      (res) => {
        console.log(res);
        this.loadData();
      },
      (err) => {
        console.log(err);
      }
    );
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
