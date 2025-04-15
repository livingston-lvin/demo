import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [MatCardModule],
})
export class DashboardComponent {
  items: any;
  constructor(private router: Router) {}
  navigate(type: string) {
    this.router.navigate([environment.servletPath,environment.raiseTicket]);
  }
}
