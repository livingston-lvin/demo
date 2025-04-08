import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { PaginatorComponent } from '../../../../components/paginator/paginator.component';
import { AlertService } from '../../../../services/alert.service';
import { PaginationDataService } from '../../../../services/pagination-data.service';
import { SnackbarService } from '../../../../services/snackbar.service';
import { StationeryDispatchService } from '../../../../services/stationery-dispatch.service';
import { OrderService } from '../../../../services/order.service';

@Component({
  selector: 'app-list-stationery-dispatch',
  templateUrl: './list-stationery-dispatch.component.html',
  styleUrl: './list-stationery-dispatch.component.scss',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    PaginatorComponent,
  ],
})
export class ListStationeryDispatchComponent implements OnInit {
  items: any[] = [];
  rows: number[] = [10, 20, 30];
  limit = signal(this.rows[0]);
  offset = signal(0);
  size = signal(0);
  records = signal(0);
  searchTxt!: string;
  from = computed(() => this.offset() * this.limit() + 1);
  to = computed(() => this.offset() * this.limit() + this.limit());

  constructor(
    private router: Router,
    private alertService: AlertService,
    private snackBarService: SnackbarService,
    private paginationDataService: PaginationDataService,
    private stationeryDispatchService: StationeryDispatchService
  ) {}

  reset() {
    this.items = [];
    this.limit.set(this.rows[0]);
    this.offset.set(0);
    this.size.set(0);
    this.records.set(0);
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.stationeryDispatchService
      .getStationeryDispatch(this.limit(), this.offset())
      .subscribe({
        next: (res) => {
          this.items = res.content;
          this.size.set(+res.totalPages);
          this.records.set(+res.totalElements);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  navigate(targetPage: any) {
    this.offset.set(targetPage - 1);
    this.paginationDataService.put({ key: 'offset', value: this.offset() });
    this.loadData();
  }

  onSelectRow(event: any) {
    this.reset();
    this.limit.set(+event.target.value);
    this.paginationDataService.put({ key: 'limit', value: this.limit() });
    this.loadData();
  }

  search() {}

  editData(id: number) {
    this.router.navigate(['/app/stationery-dispatch/edit', id]);
  }

  changePrintStatus(orderId: number) {
    this.stationeryDispatchService.changePrintStatus(orderId).subscribe({
      next: (res) => {
        this.loadData();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
