import { Routes } from '@angular/router';
import { environment } from '../environments/environment.development';
import { LayoutComponent } from '../components/layout/layout.component';
import { ListItemMasterComponent } from '../pages/master/aos-user/item-master/list-item-master/list-item-master.component';
import { CreateItemMasterComponent } from '../pages/master/aos-user/item-master/create-item-master/create-item-master.component';
import { ViewItemMasterComponent } from '../pages/master/aos-user/item-master/view-item-master/view-item-master.component';
import { EditItemMasterComponent } from '../pages/master/aos-user/item-master/edit-item-master/edit-item-master.component';
import { ListItemCategoryMasterComponent } from '../pages/master/aos-user/item-category-master/list-item-category-master/list-item-category-master.component';
import { CreateItemCategoryMasterComponent } from '../pages/master/aos-user/item-category-master/create-item-category-master/create-item-category-master.component';
import { ViewItemCategoryMasterComponent } from '../pages/master/aos-user/item-category-master/view-item-category-master/view-item-category-master.component';
import { EditItemCategoryMasterComponent } from '../pages/master/aos-user/item-category-master/edit-item-category-master/edit-item-category-master.component';

export const routes: Routes = [
  { path: '', redirectTo: environment.servletPath, pathMatch: 'full' },
  {
    path: environment.servletPath,
    component: LayoutComponent,
    children: [
      {
        path: 'master',
        children: [
          {
            path: 'aos-user',
            children: [
              {
                path: 'item',
                children: [
                  { path: 'list', component: ListItemMasterComponent },
                  { path: 'create', component: CreateItemMasterComponent },
                  { path: 'view/:id', component: ViewItemMasterComponent },
                  { path: 'edit/:id', component: EditItemMasterComponent },
                ],
              },

              {
                path: 'item-category',
                children: [
                  { path: 'list', component: ListItemCategoryMasterComponent },
                  { path: 'create', component: CreateItemCategoryMasterComponent },
                  { path: 'view/:id', component: ViewItemCategoryMasterComponent },
                  { path: 'edit/:id', component: EditItemCategoryMasterComponent },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
