import { Component, OnInit } from '@angular/core';
import { MatIconButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { OrderService } from '../../../../services/order.service';
import { StationeryDispatchService } from '../../../../services/stationery-dispatch.service';
import { UserData } from '../../stationery-dispatch/edit-stationery-dispatch/edit-stationery-dispatch.component';

@Component({
  selector: 'app-edit-dispatch-details',
  imports: [MatIconModule,  MatButtonModule],
  templateUrl: './edit-dispatch-details.component.html',
  styleUrl: './edit-dispatch-details.component.scss',
})
export class EditDispatchDetailsComponent implements OnInit {
  userData: UserData[] = [
    new UserData('Name', 'Rashmi Shukla'),
    new UserData('Mobile No', 7574825803),
    new UserData('Designation', 'Manager'),
    new UserData('Department', 'Branch Banking'),
    new UserData(
      'Address',
      '3,4,5 Satyasurya Complex A Block, Satadhar Sola Road Ahmedabad 380061'
    ),
    new UserData('Pin code', 380015),
    new UserData('Direct No', 917574825803),
    new UserData('Fax No', 'NA'),
    new UserData('Email', 'rashmi.shukla2@kotak.com'),
    new UserData('LOB / LOC / CC', '0051 / 2576 / 0460'),
    new UserData('State', 'Gujarat'),
    new UserData('City', 'Ahmedabad'),
    new UserData('Zone', 'Z1'),
    new UserData('web', 'www.kotak.com'),
  ];
  items: any[] = [];
  orderId: number;

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
      environment.dispatch,
      environment.stationeryDispatch,
      environment.list,
    ]);
  }
}
