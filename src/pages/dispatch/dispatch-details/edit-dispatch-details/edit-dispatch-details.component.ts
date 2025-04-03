import { Component, OnInit } from '@angular/core';
import { MatIconButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { OrderService } from '../../../../services/order.service';
import { StationeryDispatchService } from '../../../../services/stationery-dispatch.service';
import { DispatchDetailsService } from '../../../../services/dispatch-details.service';

@Component({
  selector: 'app-edit-dispatch-details',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './edit-dispatch-details.component.html',
  styleUrl: './edit-dispatch-details.component.scss',
})
export class EditDispatchDetailsComponent implements OnInit {
  items: any[] = [];
  orderId: number;
  user: any={};
  couriers: any[] = ['', 'GRAND SPEED', 'POST'];
  transports: any[] = ['', 'Air', 'Surface'];

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private dispatchDetailsService: DispatchDetailsService,
    private router: Router
  ) {
    this.orderId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dispatchDetailsService.getOrderDetail(this.orderId).subscribe(
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
    const payload = this.items.map(i=>{
      return {
        orderDetailId: i.orderDetailId,
        courier: i.courier,
        courierNo: i.courierNo,
        date: i.date,
        weight: i.weight,
        boxes: i.boxes,
        transport: i.transport,
      };
    })
    this.dispatchDetailsService.updateOrder(payload, this.orderId).subscribe(
      (res) => {
        console.log(res);
        this.cancel();
      },
      (err:any) => {
        console.log(err);
      }
    );
  }

  cancel() {
    this.router.navigate([
      environment.servletPath,
      environment.dispatch,
      environment.dispatchDetails,
      environment.list,
    ]);
  }

  onCourierChange(index: number, event: Event): void {
    const selectedCourier = (event.target as HTMLSelectElement).value;
    this.items[index].courier = selectedCourier;
  }

  courierNo(index: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.items[index].courierNo = value;
  }

  date(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedDate = input.value;
    this.items[index].date = selectedDate;
  }

  weight(index: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = +inputElement.value;
    this.items[index].weight = value; 
  }

  
  boxes(index: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = +inputElement.value;
    if (!isNaN(value)) {
      this.items[index].boxes = value;
    }
  }

  onTransportChange(index: number, event: Event): void {
    const selectedTransport = (event.target as HTMLSelectElement).value;
    this.items[index].transport = selectedTransport;
  }
}
