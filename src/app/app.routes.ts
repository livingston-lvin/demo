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
import { ListUserMasterComponent } from '../pages/master/aos-user/user-master/list-user-master/list-user-master.component';
import { CreateUserMasterComponent } from '../pages/master/aos-user/user-master/create-user-master/create-user-master.component';
import { ViewUserMasterComponent } from '../pages/master/aos-user/user-master/view-user-master/view-user-master.component';
import { EditUserMasterComponent } from '../pages/master/aos-user/user-master/edit-user-master/edit-user-master.component';
import { ListGstRateMasterComponent } from '../pages/master/aos-user/gst-rate-master/list-gst-rate-master/list-gst-rate-master.component';
import { CreateGstRateMasterComponent } from '../pages/master/aos-user/gst-rate-master/create-gst-rate-master/create-gst-rate-master.component';
import { ViewGstRateMasterComponent } from '../pages/master/aos-user/gst-rate-master/view-gst-rate-master/view-gst-rate-master.component';
import { EditGstRateMasterComponent } from '../pages/master/aos-user/gst-rate-master/edit-gst-rate-master/edit-gst-rate-master.component';
import { ListCourierCompanyMasterComponent } from '../pages/master/aos-user/courier-company-master/list-courier-company-master/list-courier-company-master.component';
import { CreateCourierCompanyMasterComponent } from '../pages/master/aos-user/courier-company-master/create-courier-company-master/create-courier-company-master.component';
import { ViewCourierCompanyMasterComponent } from '../pages/master/aos-user/courier-company-master/view-courier-company-master/view-courier-company-master.component';
import { EditCourierCompanyMasterComponent } from '../pages/master/aos-user/courier-company-master/edit-courier-company-master/edit-courier-company-master.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { ListItemPriceMasterComponent } from '../pages/master/aos-user/item-price/list-item-price-master/list-item-price-master.component';
import { CreateItemPriceMasterComponent } from '../pages/master/aos-user/item-price/create-item-price-master/create-item-price-master.component';
import { ViewItemPriceMasterComponent } from '../pages/master/aos-user/item-price/view-item-price-master/view-item-price-master.component';
import { EditItemPriceMasterComponent } from '../pages/master/aos-user/item-price/edit-item-price-master/edit-item-price-master.component';
import { ListBrandMasterComponent } from '../pages/master/aos-user/brand-master/list-brand-master/list-brand-master.component';
import { CreateBrandMasterComponent } from '../pages/master/aos-user/brand-master/create-brand-master/create-brand-master.component';
import { ViewBrandMasterComponent } from '../pages/master/aos-user/brand-master/view-brand-master/view-brand-master.component';
import { EditBrandMasterComponent } from '../pages/master/aos-user/brand-master/edit-brand-master/edit-brand-master.component';
import { ListCustomerMasterComponent } from '../pages/master/customer-master/list-customer-master/list-customer-master.component';
import { CreateCustomerMasterComponent } from '../pages/master/customer-master/create-customer-master/create-customer-master.component';
import { ViewCustomerMasterComponent } from '../pages/master/customer-master/view-customer-master/view-customer-master.component';
import { EditCustomerMasterComponent } from '../pages/master/customer-master/edit-customer-master/edit-customer-master.component';
import { matchAuthGuard } from '../guards/match-auth.guard';
import { parentAuthGuard } from '../guards/parent-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: environment.servletPath, pathMatch: 'full' },

  {
    path: environment.servletPath,
    component: LayoutComponent,
    children: [
      {
        path: environment.dashboard,
        component: DashboardComponent,
      },
      {
        path: environment.master,
        children: [
          {
            path: environment.aosUser,
            children: [
              // ITEM MASTER

              {
                path: environment.item,
                children: [
                  {
                    path: environment.list,
                    component: ListItemMasterComponent,
                  },
                  {
                    path: environment.create,
                    component: CreateItemMasterComponent,
                  },
                  {
                    path: `${environment.view}/:id`,
                    component: ViewItemMasterComponent,
                  },
                  {
                    path: `${environment.edit}/:id`,
                    component: EditItemMasterComponent,
                  },
                ],
              },

              // ITEM CATEGORY MASTER

              {
                path: environment.itemCategory,
                children: [
                  {
                    path: environment.list,
                    component: ListItemCategoryMasterComponent,
                  },
                  {
                    path: environment.create,
                    component: CreateItemCategoryMasterComponent,
                  },
                  {
                    path: `${environment.view}/:id`,
                    component: ViewItemCategoryMasterComponent,
                  },
                  {
                    path: `${environment.edit}/:id`,
                    component: EditItemCategoryMasterComponent,
                  },
                ],
              },

              // ITEM PRICE MASTER

              {
                path: environment.itemPrice,
                children: [
                  {
                    path: environment.list,
                    component: ListItemPriceMasterComponent,
                  },
                  {
                    path: environment.create,
                    component: CreateItemPriceMasterComponent,
                  },
                  {
                    path: `${environment.view}/:id`,
                    component: ViewItemPriceMasterComponent,
                  },
                  {
                    path: `${environment.edit}/:id`,
                    component: EditItemPriceMasterComponent,
                  },
                ],
              },

              // USER MASTER

              {
                path: environment.user,
                children: [
                  {
                    path: environment.list,
                    component: ListUserMasterComponent,
                  },
                  {
                    path: environment.create,
                    component: CreateUserMasterComponent,
                  },
                  {
                    path: `${environment.view}/:id`,
                    component: ViewUserMasterComponent,
                  },
                  {
                    path: `${environment.edit}/:id`,
                    component: EditUserMasterComponent,
                  },
                ],
              },

              // GST MASTER

              {
                path: environment.gstMaster,
                children: [
                  {
                    path: environment.list,
                    component: ListGstRateMasterComponent,
                  },
                  {
                    path: environment.create,
                    component: CreateGstRateMasterComponent,
                  },
                  {
                    path: `${environment.view}/:id`,
                    component: ViewGstRateMasterComponent,
                  },
                  {
                    path: `${environment.edit}/:id`,
                    component: EditGstRateMasterComponent,
                  },
                ],
              },

              // COURIER MASTER

              {
                path: environment.courierMaster,
                children: [
                  {
                    path: environment.list,
                    component: ListCourierCompanyMasterComponent,
                  },
                  {
                    path: environment.create,
                    component: CreateCourierCompanyMasterComponent,
                  },
                  {
                    path: `${environment.view}/:id`,
                    component: ViewCourierCompanyMasterComponent,
                  },
                  {
                    path: `${environment.edit}/:id`,
                    component: EditCourierCompanyMasterComponent,
                  },
                ],
              },

              // BRAND MASTER

              {
                path: environment.brandMaster,
                children: [
                  {
                    path: environment.list,
                    component: ListBrandMasterComponent,
                  },
                  {
                    path: environment.create,
                    component: CreateBrandMasterComponent,
                  },
                  {
                    path: `${environment.view}/:id`,
                    component: ViewBrandMasterComponent,
                  },
                  {
                    path: `${environment.edit}/:id`,
                    component: EditBrandMasterComponent,
                  },
                ],
              },
            ],
          },

          {
            path: environment.customerMaster,
            children: [
              {
                path: environment.list,
                component: ListCustomerMasterComponent,
              },
              {
                path: environment.create,
                component: CreateCustomerMasterComponent,
              },
              {
                path: `${environment.view}/:id`,
                component: ViewCustomerMasterComponent,
              },
              {
                path: `${environment.edit}/:id`,
                component: EditCustomerMasterComponent,
              },
            ],
          },
        ],
      },
    ],
  },
];
