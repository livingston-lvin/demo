import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  imports: [MatButtonModule, MatIconModule, RouterModule, ],
})
export class LayoutComponent {
  sideMenuOpened = signal(false);
  sideMenusWidth = computed(() => (this.sideMenuOpened() ? 350 : 80));

  items: any[] = [
    {
      icon: 'grid_view',
      label: 'Dashboard',
      route: 'menu',
      selected: signal(false),
      showSubItem: signal(false),
      subItems: [],
    },
    {
      icon: 'star_rate',
      label: 'Masters',
      route: 'master',
      selected: signal(false),
      showSubItem: signal(false),
      subItems: [
        {
          icon: 'account_circle',
          label: 'AOS User',
          route: 'aos-user',
          selected: signal(false),
          showSubItemsItem: signal(false),
          subItemsItems: [
            { icon: 'person', label: 'User Master', route: 'menu' },
            {
              icon: 'local_activity',
              label: 'Item Master',
              route: 'item/list',
              selected: signal(false),
            },
            {
              icon: 'category',
              label: 'Item Category Master',
              route: 'item-category/list',
              selected: signal(false),
            },
            {
              icon: 'currency_rupee',
              label: 'GST Rate Master',
              route: 'menu',
              selected: signal(false),
            },
            {
              icon: 'local_shipping',
              label: 'Courier Company Master',
              route: 'menu',
              selected: signal(false),
            },
          ],
        },
        {
          icon: 'account_box',
          label: 'Customer',
          route: 'menu',
          selected: signal(false),
        },
        {
          icon: 'password',
          label: 'Login Page',
          route: 'menu',
          selected: signal(false),
        },
      ],
    },
    {
      icon: 'app_registration',
      label: 'Actions',
      route: 'menu',
      showSubItem: signal(false),
      subItems: [],
    },
  ];

  constructor(private router: Router) {}

  navigate(route: string[]) {
    let routes: string[] = [];
    routes.push(environment.servletPath);
    for (let i = 0; i < route.length; i++) {
      const newRoute: string = route[i];
      const newRoutes: string[] = newRoute.split('/');
      for (let j = 0; j < newRoutes.length; j++) {
        routes.push(newRoutes[j]);
      }
    }
    this.router.navigate(routes);
  }
}
