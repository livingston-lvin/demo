import { Component, computed, signal, ViewChild } from '@angular/core';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    DrawerModule,
    ButtonModule,
    AvatarModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class AppComponent {
  visible: boolean = true;
  visible1: boolean = false;
  visible2: boolean = false;
  visible3: boolean = false;
  visible4: boolean = false;

  @ViewChild('drawerRef') drawerRef!: Drawer;

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  sideMenuOpened = signal(true);
  sideMenusWidth = computed(() => (this.sideMenuOpened() ? 300 : 80));

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
            { icon: 'local_shipping', label: 'Courier Company Master', route: 'menu' },
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
