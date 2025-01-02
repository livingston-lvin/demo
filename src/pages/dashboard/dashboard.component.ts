import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [MatCardModule],
})
export class DashboardComponent {
items: any;
}
