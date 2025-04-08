import { Component, computed, effect, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  NavigationEnd,
  Router,
  RouterModule,
  UrlSegment,
} from '@angular/router';
import { environment } from '../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { filter } from 'rxjs';
import { UrlChangeInterceptorService } from '../../services/url-change.service';
import { PaginationDataService } from '../../services/pagination-data.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    MatMenuModule,
  ],
})
export class LayoutComponent {
  clear() {
    this.paginationDataService.clearAll();
  }
  sideMenuOpened = signal(true);
  sideMenusWidth = computed(() => (this.sideMenuOpened() ? 400 : 80));
  items: any[] = [];
  username!: string;
  navigateRoute = signal<null | any>(null);

  constructor(
    private router: Router,
    private urlService: UrlChangeInterceptorService,
    private paginationDataService: PaginationDataService
  ) {
    const user = localStorage.getItem('user');
    this.navigateRoute = this.urlService.tarUrls;
    if (user) {
      const appUser = JSON.parse(user);
      this.username = appUser.username;
    }
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
                icon: 'apartment',
                label: 'Brand Master',
                route: 'brand/list',
                selected: signal(false),
              },
              {
                icon: 'category',
                label: 'Item Category Master',
                route: 'item-category/list',
                selected: signal(false),
              },
              {
                icon: 'local_activity',
                label: 'Item Master',
                route: 'item/list',
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
            subItemsItems: [
              {
                icon: 'person',
                label: 'Customer Master',
                route: 'master/list',
                selected: signal(false),
              },
              {
                icon: 'local_activity',
                label: 'Customer Item Master',
                route: 'item/list',
                selected: signal(false),
              },
            ],
          },
        ],
      },

      {
        icon: 'home_max',
        label: 'Stationery Dispatch',
        route: 'stationery-dispatch/list',
        selected: signal(false),
        showSubItem: signal(false),
        subItems: [],
      },

      {
        icon: 'local_shipping',
        label: 'Dispatch',
        route: 'dispatch',
        selected: signal(false),
        showSubItem: signal(false),
        subItems: [
          {
            icon: 'golf_course',
            label: 'Dispatch Details',
            route: 'dispatch-details/list',
            selected: signal(false),
            showSubItemsItem: signal(false),
            subItemsItems: [],
          },
          {
            icon: 'cloud_upload',
            label: 'Upload Courier Details',
            route: 'courier-details',
            selected: signal(false),
            showSubItemsItem: signal(false),
            subItemsItems: [],
          },
          {
            icon: 'summarize',
            label: 'Report',
            route: 'reports',
            selected: signal(false),
            showSubItemsItem: signal(false),
            subItemsItems: [],
          },
        ],
      },

      {
        icon: 'description',
        label: 'Dispatch Report',
        route: 'dispatch-report',
        selected: signal(false),
        showSubItem: signal(false),
        subItems: [],
      },
    ];

    effect(() => {
      if (this.navigateRoute() !== null) {
        const urls = this.navigateRoute();
        if (urls) {
          let items = [];
          const length = urls.length;
          for (let i = 0; i < this.items.length; i++) {
            const url = urls[0];
            const item = this.items[i];
            if (item && url === item.route) {
              items.push(item);
              if (length === 1) {
                break;
              } else {
                const subItems = item.subItems;
                for (let j = 0; j < subItems.length; j++) {
                  const subUrl = urls[1];
                  const subItem = subItems[j];
                  if (subUrl === subItem.route) {
                    items.push(subItem);
                    if (length === 2) {
                      break;
                    } else {
                      const subItemsItems = subItem.subItemsItems;
                      for (let k = 0; k < subItemsItems.length; k++) {
                        const subSubUrl = urls[2];
                        const subItemItem = subItemsItems[k];
                        if (subSubUrl === subItemItem.route) {
                          items.push(subItemItem);
                          break;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          this.navigate(this.navigateRoute(), items);
        }
      }
    });
  }

  navigate(route: string[], data: any[]) {
    if (route !== null) {
      this.resetRoute();
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        const length = data.length;

        // single route
        if (length === 1 && item.route === data[0].route) {
          item.selected.set(true);
          break;
        }

        // second route
        else if (length === 2) {
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
        }

        // thrird route
        else if (length === 3) {
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

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
