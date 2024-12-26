import { Component, computed, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutComponent } from '../components/layout/layout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [MatButtonModule, MatIconModule, LayoutComponent],
})
export class AppComponent {
  sideMenuOpened = signal(true);
  sideMenusWidth = computed(() => (this.sideMenuOpened() ? 350 : 80));

  items: any[] = [
    {
      icon: 'grid_view',
      label: 'Dashboard',
      route: 'menu',
      showSubItem: signal(false),
      subItems: [],
    },
    {
      icon: 'star_rate',
      label: 'Masters',
      route: 'menu',
      showSubItem: signal(false),
      subItems: [
        {
          icon: 'account_circle',
          label: 'AOS User',
          route: 'menu',
          showSubItemsItem: signal(false),
          subItemsItems: [
            { icon: 'person', label: 'User Master', route: 'menu' },
            { icon: 'local_activity', label: 'Item Master', route: 'menu' },
            { icon: 'category', label: 'Item Category Master', route: 'menu' },
            { icon: 'currency_rupee', label: 'GST Rate Master', route: 'menu' },
            {
              icon: 'local_shipping',
              label: 'Courier Company Master',
              route: 'menu',
            },
          ],
        },
        { icon: 'account_box', label: 'Customer', route: 'menu' },
        { icon: 'password', label: 'Login Page', route: 'menu' },
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
}
