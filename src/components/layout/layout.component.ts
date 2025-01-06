import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  imports: [MatButtonModule, MatIconModule, RouterModule, CommonModule,MatMenuModule],
})
export class LayoutComponent  {
  sideMenuOpened = signal(false);
  sideMenusWidth = computed(() => (this.sideMenuOpened() ? 350 : 80));
  items: any[] = [];
  constructor(private router: Router) {
    this.items = [
      {
        icon: 'grid_view',
        label: 'Dashboard',
        route: 'dashboard',
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
              {
                icon: 'person',
                label: 'User Master',
                route: 'user/list',
                selected: signal(false),
              },
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
                icon: 'percent',
                label: 'GST Rate Master',
                route: 'gst/list',
                selected: signal(false),
              },
              {
                icon: 'local_shipping',
                label: 'Courier Company Master',
                route: 'courier/list',
                selected: signal(false),
              },
            ],
          },
          {
            icon: 'account_box',
            label: 'Customer',
            route: 'customer',
            selected: signal(false),
            showSubItemsItem: signal(false),
            subItemsItems: [],
          },
          {
            icon: 'password',
            label: 'Login Page',
            route: 'password',
            selected: signal(false),
            showSubItemsItem: signal(false),
            subItemsItems: [],
          },
        ],
      },
      {
        icon: 'app_registration',
        label: 'Actions',
        route: 'action',
        selected: signal(false),
        showSubItem: signal(false),
        subItems: [],
      },
    ];
  }

  navigate(route: string[], data: any[]) {
    this.resetRoute();
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const length = data.length;
      if (length === 1 && item.route === data[0].route) {
        item.selected.set(true);
        break;
      } else if (length === 2) {
        if (item.route === data[0].route) {
          item.selected.set(true);
          item.showSubItem.set(true);
          const subItems: any[] = item.subItems;
          for (let j = 0; j < subItems.length; j++) {
            const subItem = subItems[j];
            if (subItem.route === data[1].route) {
              subItem.selected.set(true);
              break;
            }
          }
          break;
        }
      } else if (length === 3) {
        if (item.route === data[0].route) {
          item.selected.set(true);
          item.showSubItem.set(true);
          const subItems: any[] = item.subItems;
          for (let j = 0; j < subItems.length; j++) {
            const subItem = subItems[j];
            if (subItem.route === data[1].route) {
              subItem.selected.set(true);
              subItem.showSubItemsItem.set(true);
              const subItemItems: any[] = subItem.subItemsItems;
              for (let k = 0; k < subItemItems.length; k++) {
                const subItemsItem = subItemItems[k];
                if (subItemsItem.route === data[2].route) {
                  subItemsItem.selected.set(true);
                  break;
                }
              }
              break;
            }
          }
          break;
        }
      }
    }
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

  resetRoute() {
    this.items.forEach((item) => {
      item.selected.set(false);
      item.showSubItem.set(false);
      const subItems: any[] = item.subItems;
      if (subItems.length > 0) {
        subItems.forEach((subItem) => {
          subItem.selected.set(false);
          subItem.showSubItemsItem.set(false);
          const subItemsItems: any[] = subItem.subItemsItems;
          if (subItemsItems.length > 0) {
            subItemsItems.forEach((subItemsItem) => {
              subItemsItem.selected.set(false);
            });
          }
        });
      }
    });
  }
}
