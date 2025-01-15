import { Component, computed, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerItemService } from '../../../../../services/customer-item.service';
import { environment } from '../../../../../environments/environment.development';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from '../../../../../components/paginator/paginator.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-view-customer-item-master',
  templateUrl: './view-customer-item-master.component.html',
  styleUrl: './view-customer-item-master.component.scss',
  imports: [MatIconModule, FormsModule, PaginatorComponent, MatButtonModule],
})
export class ViewCustomerItemMasterComponent implements OnInit {
  items: any[] = [];
  rows: number[] = [5, 10, 20];
  limit = signal(this.rows[0]);
  offset = signal(0);
  size: number = 0;
  page: number = 0;
  records: number = 0;
  searchTxt!: string;
  from = computed(() => this.offset() * this.limit() + 1);
  to = computed(() => this.offset() * this.limit() + this.limit());
  id: number;

  constructor(
    private router: Router,
    private customerItemService: CustomerItemService,
    private route: ActivatedRoute
  ) {
    this.id = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.customerItemService
      .getCustomerItems(this.limit(), this.offset(), this.id)
      .subscribe(
        (res) => {
          this.items = res.content;
          this.size = +res.totalPages;
          this.records = +res.totalElements;
          this.page = this.items.length > 0 ? 1 : 0;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  reset() {
    this.items = [];
    this.limit.set(this.rows[0]);
    this.offset.set(0);
    this.size = 0;
    this.page = 0;
    this.records = 0;
  }

  navigate(targetPage: any) {
    this.page = targetPage;
    this.offset.set(targetPage - 1);
    this.loadData();
  }

  navigateToCustomerItemList() {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.customerMaster,
      environment.item,
      environment.list,
    ]);
  }

  onSelectRow(event: any) {
    this.reset();
    this.limit.set(+event.target.value);
    this.loadData();
  }

  search() {
    this.customerItemService
      .search(this.searchTxt, this.limit(), this.offset())
      .subscribe(
        (res) => {
          this.items = res.content;
          this.size = +res.totalPages;
          this.records = +res.totalElements;
          this.page = this.items.length > 0 ? 1 : 0;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  editData(id: number) {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.customerMaster,
      environment.item,
      environment.edit,
      id,
    ]);
  }

  deleteData(id: number) {}
}
