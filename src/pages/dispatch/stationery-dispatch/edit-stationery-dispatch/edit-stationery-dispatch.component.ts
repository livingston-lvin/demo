import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OrderService } from '../../../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StationeryDispatchService } from '../../../../services/stationery-dispatch.service';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-edit-stationery-dispatch',
  templateUrl: './edit-stationery-dispatch.component.html',
  styleUrl: './edit-stationery-dispatch.component.scss',
  imports: [MatIconModule, MatIconButton, MatButtonModule],
})
export class EditStationeryDispatchComponent implements OnInit {
  items: any[] = [];
  orderId: number;
  user: any;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private stationeryDispatchService: StationeryDispatchService,
    private router: Router
  ) {
    this.orderId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.stationeryDispatchService.getOrderDetail(this.orderId).subscribe(
      (res) => {
        this.items = res.field;
        this.user = res.value;
        this.items.forEach((item) => {
          item.checked = false;
          item.dispatch = item.status === null ? '' : item.status;
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  check(index: number) {
    this.items[index].checked = !this.items[index].checked;
    this.items[index].dispatch = this.items[index].checked ? 'Dispatch' : '';
  }

  checkAll(event: any) {
    const value: boolean = event.target.checked;
    this.items.forEach((item) => {
      item.checked = value;
      item.dispatch = item.checked ? 'Dispatch' : '';
    });
  }

  submit() {
    const payload: any[] = this.items.filter(
      (item) => item.dispatch === 'Dispatch'
    );
    const data: number[] = [];
    payload.forEach((p) => data.push(p.orderDetailId));
    this.stationeryDispatchService.dispatchOrder(data, this.orderId).subscribe(
      (res) => {
        console.log(res);
        this.cancel();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  cancel() {
    this.router.navigate([
      environment.servletPath,
      environment.stationeryDispatch,
      environment.list,
    ]);
  }

  print(){
    this.router.navigate([
      environment.servletPath,
      environment.poster,
    ]);
  }
}
