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
  sideMenusWidth = computed(() => (this.sideMenuOpened() ? 250 : 80));

  items: any[] = [
    {
      icon: 'grid_view',
      label: 'Dashboard',
      route: 'menu',
      showSubItem: signal(false),
      subItems: [
        {
          icon: 'looks_one',
          label: 'Dashboard 1',
          route: 'menu',
          showSubItemsItems: signal(false),
          subItemsItems: [
            { icon: 'counter_1', label: 'Dashboard 1', route: 'menu' },
            { icon: 'counter_2', label: 'Dashboard 2', route: 'menu' },
            { icon: 'counter_3', label: 'Dashboard 3', route: 'menu' },
          ],
        },
        { icon: 'looks_two', label: 'Dashboard 2', route: 'menu' },
        { icon: 'timer_3', label: 'Dashboard 3', route: 'menu' },
      ],
    },
    {
      icon: 'home',
      label: 'Home Page',
      route: 'menu',
      showSubItem: signal(false),
      subItems: [],
    },
    {
      icon: 'list_alt',
      label: 'Orders',
      route: 'menu',
      showSubItem: signal(false),
      subItems: [],
    },
  ];
}
