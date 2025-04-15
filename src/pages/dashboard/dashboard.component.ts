import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { DashboardService } from '../../services/dashboard.service';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [MatCardModule,NgClass],
})
export class DashboardComponent implements OnInit {
  items: any[]=[];
  constructor(
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dashboardService.getData().subscribe(
      (response) => {
        this.items = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  navigate(type: string) {
    this.router.navigate([environment.servletPath, environment.raiseTicket]);
  }
}
