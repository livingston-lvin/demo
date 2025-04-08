import { Routes } from '@angular/router';
import { environment } from '../environments/environment.development';
import { LayoutComponent } from '../components/layout/layout.component';
import { ListItemMasterComponent } from '../pages/master/aos-user/item-master/list-item-master/list-item-master.component';
import { CreateItemMasterComponent } from '../pages/master/aos-user/item-master/create-item-master/create-item-master.component';
import { EditItemMasterComponent } from '../pages/master/aos-user/item-master/edit-item-master/edit-item-master.component';
import { ListItemCategoryMasterComponent } from '../pages/master/aos-user/item-category-master/list-item-category-master/list-item-category-master.component';
import { CreateItemCategoryMasterComponent } from '../pages/master/aos-user/item-category-master/create-item-category-master/create-item-category-master.component';
import { EditItemCategoryMasterComponent } from '../pages/master/aos-user/item-category-master/edit-item-category-master/edit-item-category-master.component';
import { ListUserMasterComponent } from '../pages/master/aos-user/user-master/list-user-master/list-user-master.component';
import { CreateUserMasterComponent } from '../pages/master/aos-user/user-master/create-user-master/create-user-master.component';
import { EditUserMasterComponent } from '../pages/master/aos-user/user-master/edit-user-master/edit-user-master.component';
import { ListGstRateMasterComponent } from '../pages/master/aos-user/gst-rate-master/list-gst-rate-master/list-gst-rate-master.component';
import { CreateGstRateMasterComponent } from '../pages/master/aos-user/gst-rate-master/create-gst-rate-master/create-gst-rate-master.component';
import { EditGstRateMasterComponent } from '../pages/master/aos-user/gst-rate-master/edit-gst-rate-master/edit-gst-rate-master.component';
import { ListCourierCompanyMasterComponent } from '../pages/master/aos-user/courier-company-master/list-courier-company-master/list-courier-company-master.component';
import { CreateCourierCompanyMasterComponent } from '../pages/master/aos-user/courier-company-master/create-courier-company-master/create-courier-company-master.component';
import { EditCourierCompanyMasterComponent } from '../pages/master/aos-user/courier-company-master/edit-courier-company-master/edit-courier-company-master.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { ListBrandMasterComponent } from '../pages/master/aos-user/brand-master/list-brand-master/list-brand-master.component';
import { CreateBrandMasterComponent } from '../pages/master/aos-user/brand-master/create-brand-master/create-brand-master.component';
import { EditBrandMasterComponent } from '../pages/master/aos-user/brand-master/edit-brand-master/edit-brand-master.component';
import { ListCustomerMasterComponent } from '../pages/master/customer/customer-master/list-customer-master/list-customer-master.component';
import { CreateCustomerMasterComponent } from '../pages/master/customer/customer-master/create-customer-master/create-customer-master.component';
import { ViewCustomerMasterComponent } from '../pages/master/customer/customer-master/view-customer-master/view-customer-master.component';
import { EditCustomerMasterComponent } from '../pages/master/customer/customer-master/edit-customer-master/edit-customer-master.component';
import { EditCustomerItemMasterComponent } from '../pages/master/customer/customer-item-master/edit-customer-item-master/edit-customer-item-master.component';
import { ListCustomerItemMasterComponent } from '../pages/master/customer/customer-item-master/list-customer-item-master/list-customer-item-master.component';
import { CreateCustomerItemMasterComponent } from '../pages/master/customer/customer-item-master/create-customer-item-master/create-customer-item-master.component';
import { ViewCustomerItemMasterComponent } from '../pages/master/customer/customer-item-master/view-customer-item-master/view-customer-item-master.component';
import { LoginComponent } from '../pages/auth/login/login.component';
import { ListOrderComponent } from '../pages/order/list-order/list-order.component';
import { ViewOrderComponent } from '../pages/order/view-order/view-order.component';
import { DispatchReportComponent } from '../pages/dispatch-report/dispatch-report.component';
import { ListStationeryDispatchComponent } from '../pages/dispatch/stationery-dispatch/list-stationery-dispatch/list-stationery-dispatch.component';
import { EditStationeryDispatchComponent } from '../pages/dispatch/stationery-dispatch/edit-stationery-dispatch/edit-stationery-dispatch.component';
import { ListDispatchDetailsComponent } from '../pages/dispatch/dispatch-details/list-dispatch-details/list-dispatch-details.component';
import { EditDispatchDetailsComponent } from '../pages/dispatch/dispatch-details/edit-dispatch-details/edit-dispatch-details.component';
import { PosterComponent } from '../pages/dispatch/dispatch-details/poster/poster.component';
import { BulkDispatchDetailsComponent } from '../pages/dispatch/dispatch-details/bulk-dispatch-details/bulk-dispatch-details.component';
import { ReportsComponent } from '../pages/dispatch/dispatch-details/reports/reports.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },

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
                    path: `${environment.edit}/:id`,
                    component: EditItemCategoryMasterComponent,
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
                path: environment.master,
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
              {
                path: environment.item,
                children: [
                  {
                    path: environment.list,
                    component: ListCustomerItemMasterComponent,
                  },
                  {
                    path: environment.create,
                    component: CreateCustomerItemMasterComponent,
                  },
                  {
                    path: `${environment.view}/:id`,
                    component: ViewCustomerItemMasterComponent,
                  },
                  {
                    path: `${environment.edit}/:id`,
                    component: EditCustomerItemMasterComponent,
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        path: environment.stationeryDispatch,
        children: [
          {
            path: environment.list,
            component: ListStationeryDispatchComponent,
          },
          {
            path: `${environment.edit}/:id`,
            component: EditStationeryDispatchComponent,
          },
        ],
      },

      {
        path: 'dispatch-report',
        component: DispatchReportComponent,
      },

      // DISPATCH

      {
        path: environment.dispatch,
        children: [
          {
            path: environment.dispatchDetails,
            children: [
              {
                path: environment.list,
                component: ListDispatchDetailsComponent,
              },
              {
                path: `${environment.edit}/:id`,
                component: EditDispatchDetailsComponent,
              },
            ],
          },
          {
            path: environment.courierDetails,
            component: BulkDispatchDetailsComponent,
          },
          {
            path: environment.reports,
            component: ReportsComponent,
          },
        ],
      },

      {
        path: environment.poster+'/:id',
        component: PosterComponent,
      },
    ],
  },
];
