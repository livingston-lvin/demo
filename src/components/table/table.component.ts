import { CommonModule } from '@angular/common';
import { Component, computed, input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PaginatorComponent } from '../paginator/paginator.component';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { UserService } from '../../services/user.service';
import { ItemService } from '../../services/item.service';
import { ItemCategoryService } from '../../services/item-category.service';
import { GstService } from '../../services/gst.service';
import { CourierService } from '../../services/courier.service';
import { ItemPriceService } from '../../services/item-price.service';
import {
  brandMaster,
  courierMaster,
  customerItemMaster,
  customerMaster,
  gstMaster,
  itemCategoryMaster,
  itemMaster,
  itemPriceMaster,
  userMaster,
} from '../../constants/Module';
import { CreateItemCategoryMasterComponent } from '../../pages/master/aos-user/item-category-master/create-item-category-master/create-item-category-master.component';
import { EditItemCategoryMasterComponent } from '../../pages/master/aos-user/item-category-master/edit-item-category-master/edit-item-category-master.component';
import { CreateBrandMasterComponent } from '../../pages/master/aos-user/brand-master/create-brand-master/create-brand-master.component';
import { EditBrandMasterComponent } from '../../pages/master/aos-user/brand-master/edit-brand-master/edit-brand-master.component';
import { BrandService } from '../../services/brand.service';
import { ImageComponent } from '../image/image.component';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    PaginatorComponent,
  ],
})
export class TableComponent implements OnInit {
  items: any[] = [];
  rows: number[] = [5, 10, 20];
  limit = signal(this.rows[0]);
  offset = signal(0);
  size: number = 0;
  page: number = 0;
  records: number = 0;
  searchTxt!: string;
  from = computed(() => this.offset() * this.limit() + 1);
  to = computed(() => this.offset() * this.limit() + this.limit());
  headers = input.required<string[]>();
  addBtnTxt = input.required<string>();
  module = input.required<string[]>();
  curModule = computed(() => this.module()[this.module().length - 1]);

  userMaster = signal(userMaster);
  itemMaster = signal(itemMaster);
  itemCategoryMaster = signal(itemCategoryMaster);
  itemPriceMaster = signal(itemPriceMaster);
  gstMaster = signal(gstMaster);
  courierMaster = signal(courierMaster);
  brandMaster = signal(brandMaster);
  customerMaster = signal(customerMaster);
  customerItemMaster = signal(customerItemMaster);

  constructor(
    private router: Router,
    private userService: UserService,
    private itemService: ItemService,
    private itemCategoryService: ItemCategoryService,
    private itemPriceService: ItemPriceService,
    private gstService: GstService,
    private courierService: CourierService,
    private brandService: BrandService,
    private customerService: CustomerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    if (this.curModule() === userMaster) {
      this.loadUser();
    } else if (this.curModule() === itemMaster) {
      this.loadItem();
    } else if (this.curModule() === itemCategoryMaster) {
      this.loadItemCategory();
    } else if (this.curModule() === itemPriceMaster) {
      this.loadItemPrice();
    } else if (this.curModule() === gstMaster) {
      this.loadGst();
    } else if (this.curModule() === courierMaster) {
      this.loadCourier();
    } else if (this.curModule() === brandMaster) {
      this.loadBrand();
    } else if (this.curModule() === customerMaster) {
      this.loadCustomer();
    }
  }

  navigateToCreateData() {
    if (this.curModule() === userMaster) {
      this.navigateToCreateUser();
    } else if (this.curModule() === itemMaster) {
      this.navigateToCreateItem();
    } else if (this.curModule() === itemCategoryMaster) {
      this.openDialog(null, 'item-category');
    } else if (this.curModule() === itemPriceMaster) {
      this.navigateToCreateItemPrice();
    } else if (this.curModule() === gstMaster) {
      this.navigateToCreateGst();
    } else if (this.curModule() === courierMaster) {
      this.navigateToCreateCourier();
    } else if (this.curModule() === brandMaster) {
      this.openDialog(null, 'brand');
    } else if (this.curModule() === customerMaster) {
      this.navigateToCreateCustomer();
    } else if (this.curModule() === customerItemMaster) {
      this.navigateToCreateCustomerItem();
    }
  }

  editData(id: number) {
    if (this.curModule() === userMaster) {
      this.editUser(id);
    } else if (this.curModule() === itemMaster) {
      this.editItem(id);
    } else if (this.curModule() === itemCategoryMaster) {
      this.openDialog(id, 'item-category');
    } else if (this.curModule() === itemPriceMaster) {
      this.editItemPrice(id);
    } else if (this.curModule() === gstMaster) {
      this.editGst(id);
    } else if (this.curModule() === courierMaster) {
      this.editCourier(id);
    } else if (this.curModule() === brandMaster) {
      this.openDialog(id, 'brand');
    } else if (this.curModule() === customerMaster) {
      this.editCustomer(id);
    }
  }

  deleteData(id: number) {
    if (this.curModule() === userMaster) {
      this.deleteUser(id);
    } else if (this.curModule() === itemMaster) {
      this.deleteItem(id);
    } else if (this.curModule() === itemCategoryMaster) {
      this.deleteItemCategory(id);
    } else if (this.curModule() === itemPriceMaster) {
      this.deleteItemPrice(id);
    } else if (this.curModule() === gstMaster) {
      this.deleteGst(id);
    } else if (this.curModule() === courierMaster) {
      this.deleteCourier(id);
    } else if (this.curModule() === customerMaster) {
      this.deleteCustomer(id);
    }
  }

  search() {
    if (this.searchTxt) {
      if (this.curModule() === userMaster) {
        this.searchUser();
      } else if (this.curModule() === itemMaster) {
        this.searchItem();
      } else if (this.curModule() === itemCategoryMaster) {
        this.searchItemCategory();
      } else if (this.curModule() === itemPriceMaster) {
        this.searchItemPrice();
      } else if (this.curModule() === gstMaster) {
        this.searchGst();
      } else if (this.curModule() === courierMaster) {
        this.searchCourier();
      }
    }
  }

  onSelectRow(event: any) {
    this.reset();
    this.limit.set(+event.target.value);
    this.loadData();
  }

  reset() {
    this.items = [];
    this.limit.set(this.rows[0]);
    this.offset.set(0);
    this.size = 0;
    this.page = 0;
    this.records = 0;
  }

  navigate(targetPage: any) {
    this.page = targetPage;
    this.offset.set(targetPage - 1);
    this.loadData();
  }

  navigateToCreateUser() {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.aosUser,
      environment.user,
      environment.create,
    ]);
  }

  navigateToCreateItem() {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.aosUser,
      environment.item,
      environment.create,
    ]);
  }

  navigateToCreateItemPrice() {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.aosUser,
      environment.itemPrice,
      environment.create,
    ]);
  }

  navigateToCreateGst() {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.aosUser,
      environment.gstMaster,
      environment.create,
    ]);
  }

  navigateToCreateCourier() {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.aosUser,
      environment.courierMaster,
      environment.create,
    ]);
  }

  navigateToCreateBrand() {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.aosUser,
      environment.brandMaster,
      environment.create,
    ]);
  }

  navigateToCreateCustomer() {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.customerMaster,
      environment.master,
      environment.create,
    ]);
  }

  navigateToCreateCustomerItem() {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.customerMaster,
      environment.item,
      environment.create,
    ]);
  }

  editUser(id: number) {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.aosUser,
      environment.user,
      environment.edit,
      id,
    ]);
  }

  editItem(id: number) {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.aosUser,
      environment.item,
      environment.edit,
      id,
    ]);
  }

  editItemPrice(id: number) {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.aosUser,
      environment.itemPrice,
      environment.edit,
      id,
    ]);
  }

  editGst(id: number) {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.aosUser,
      environment.gstMaster,
      environment.edit,
      id,
    ]);
  }

  editCourier(id: number) {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.aosUser,
      environment.courierMaster,
      environment.edit,
      id,
    ]);
  }

  editCustomer(id: number) {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.aosUser,
      environment.customerMaster,
      environment.edit,
      id,
    ]);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      (res) => {
        this.loadData();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteItem(id: number) {
    this.itemService.delete(id).subscribe(
      (res) => {
        this.loadData();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteItemCategory(id: number) {
    this.itemCategoryService.deleteItemCategory(id).subscribe(
      (res) => {
        this.loadData();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteItemPrice(id: number) {
    this.itemPriceService.delete(id).subscribe(
      (res) => {
        this.loadData();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteGst(id: number) {
    this.gstService.deleteGst(id).subscribe(
      (res) => {
        this.loadData();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteCourier(id: number) {
    this.courierService.deleteCourier(id).subscribe(
      (res) => {
        this.loadData();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe(
      (res) => {
        this.loadData();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  searchUser() {
    this.userService
      .search(this.searchTxt, this.limit(), this.offset())
      .subscribe(
        (res) => {
          this.items = res.content;
          this.size = +res.totalPages;
          this.records = +res.totalElements;
          this.page = this.items.length > 0 ? 1 : 0;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  searchItem() {
    this.itemService
      .search(this.searchTxt, this.limit(), this.offset())
      .subscribe(
        (res) => {
          this.items = res.content;
          this.size = +res.totalPages;
          this.records = +res.totalElements;
          this.page = this.items.length > 0 ? 1 : 0;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  searchItemCategory() {
    this.itemCategoryService
      .search(this.searchTxt, this.limit(), this.offset())
      .subscribe(
        (res) => {
          this.items = res.content;
          this.size = +res.totalPages;
          this.records = +res.totalElements;
          this.page = this.items.length > 0 ? 1 : 0;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  searchItemPrice() {
    this.itemPriceService
      .search(this.searchTxt, this.limit(), this.offset())
      .subscribe(
        (res) => {
          this.items = res.content;
          this.size = +res.totalPages;
          this.records = +res.totalElements;
          this.page = this.items.length > 0 ? 1 : 0;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  searchGst() {
    this.gstService
      .search(this.searchTxt, this.limit(), this.offset())
      .subscribe(
        (res) => {
          this.items = res.content;
          this.size = +res.totalPages;
          this.records = +res.totalElements;
          this.page = this.items.length > 0 ? 1 : 0;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  searchCourier() {
    this.courierService
      .search(this.searchTxt, this.limit(), this.offset())
      .subscribe(
        (res) => {
          this.items = res.content;
          this.size = +res.totalPages;
          this.records = +res.totalElements;
          this.page = this.items.length > 0 ? 1 : 0;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  loadUser() {
    this.userService.getUsers(this.limit(), this.offset()).subscribe(
      (res) => {
        this.items = res.content;
        this.size = +res.totalPages;
        this.records = +res.totalElements;
        this.page = this.items.length > 0 ? 1 : 0;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  loadItem() {
    this.itemService.getItems(this.limit(), this.offset()).subscribe(
      (res) => {
        this.items = res.content;
        this.size = +res.totalPages;
        this.records = +res.totalElements;
        this.page = this.items.length > 0 ? 1 : 0;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  loadItemCategory() {
    this.itemCategoryService
      .getItemCategories(this.limit(), this.offset())
      .subscribe(
        (res) => {
          this.items = res.content;
          this.size = +res.totalPages;
          this.records = +res.totalElements;
          this.page = this.items.length > 0 ? 1 : 0;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  loadItemPrice() {
    this.itemPriceService.getAll(this.limit(), this.offset()).subscribe(
      (res) => {
        this.items = res.content;
        this.size = +res.totalPages;
        this.records = +res.totalElements;
        this.page = this.items.length > 0 ? 1 : 0;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  loadGst() {
    this.gstService.getGsts(this.limit(), this.offset()).subscribe(
      (res) => {
        this.items = res.content;
        this.size = +res.totalPages;
        this.records = +res.totalElements;
        this.page = this.items.length > 0 ? 1 : 0;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  loadCourier() {
    this.courierService.getCouriers(this.limit(), this.offset()).subscribe(
      (res) => {
        this.items = res.content;
        this.size = +res.totalPages;
        this.records = +res.totalElements;
        this.page = this.items.length > 0 ? 1 : 0;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  loadBrand() {
    this.brandService.getBrands(this.limit(), this.offset()).subscribe(
      (res) => {
        this.items = res.content;
        this.size = +res.totalPages;
        this.records = +res.totalElements;
        this.page = this.items.length > 0 ? 1 : 0;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  loadCustomer() {
    this.customerService.getCustomers(this.limit(), this.offset()).subscribe(
      (res) => {
        this.items = res.content;
        this.size = +res.totalPages;
        this.records = +res.totalElements;
        this.page = this.items.length > 0 ? 1 : 0;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openDialog(id: number | null, module: string): void {
    let component: any | null = null;
    if (id === null) {
      if (module === 'item-category') {
        component = CreateItemCategoryMasterComponent;
      } else if (module === 'brand') {
        component = CreateBrandMasterComponent;
      }
    } else {
      if (module === 'item-category') {
        component = EditItemCategoryMasterComponent;
      } else if (module === 'brand') {
        component = EditBrandMasterComponent;
      }
    }

    this.dialog.open(component, {
      width: '500px',
      height: '250px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: { id },
    });
  }

  openImage(srcUrl: string, name: string) {
    this.dialog.open(ImageComponent, {
      width: '500px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: { srcUrl, name },
    });
  }
}
