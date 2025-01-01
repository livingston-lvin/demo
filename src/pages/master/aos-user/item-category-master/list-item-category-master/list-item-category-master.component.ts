import { Component, OnInit } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PaginatorComponent } from '../../../../../components/paginator/paginator.component';
import { Item } from '../../../../../interfaces/item';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateItemCategoryMasterComponent } from '../create-item-category-master/create-item-category-master.component';
import { ItemCategoryService } from '../../../../../services/item-category.service';
import { ItemCategory } from '../../../../../interfaces/item-category';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { EditItemCategoryMasterComponent } from '../edit-item-category-master/edit-item-category-master.component';

@Component({
  selector: 'app-list-item-category-master',
  templateUrl: './list-item-category-master.component.html',
  styleUrl: './list-item-category-master.component.scss',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    PaginatorComponent,
    MatSelectModule,
    MatIconButton,
    MatDialogModule,
    CommonModule,
  ],
})
export class ListItemCategoryMasterComponent implements OnInit {
  items: ItemCategory[] = [];
  rows: number[] = [5, 10, 20];
  limit: number = this.rows[0];
  offset: number = 0;
  // how many pages to be displayed in paginator component
  size: number = 0;
  // indicates current page in the paginator component
  page: number = 0;
  records: number = 0;
  searchTxt!: string;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private itemCategoryService: ItemCategoryService
  ) {}

  // reset() {
  //   this.items = [];
  //   this.offset = 0;
  //   this.size = 0;
  //   this.page = 0;
  //   this.records = 0;
  //   this.searchTxt = '';
  // }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.itemCategoryService
      .getItemCategories(this.limit, this.offset)
      .subscribe(
        (res) => {
          this.items = res.content;
          this.size = +res.totalPages;
          this.records = +res.totalElements;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onSelectRow(event: any) {
    this.limit = +event.target.value;
  }

  navigate(targetPage: any) {
    this.page = targetPage;
    this.offset = targetPage - 1;
    this.loadData();
  }

  navigateToCreateItemCategory() {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.aosUser,
      environment.itemCategory,
      environment.create,
    ]);
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    component: any | null,
    id: number | null
  ): void {
    if (component === null) {
      component = CreateItemCategoryMasterComponent;
    }
    this.dialog.open(component, {
      width: '500px',
      height: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { id },
    });
  }

  viewCategory(id: number) {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.aosUser,
      environment.itemCategory,
      environment.view,
      id,
    ]);
  }

  editCategory(id: number) {
    const dialog = this.openDialog(
      '0ms',
      '0ms',
      EditItemCategoryMasterComponent,
      id
    );
  }

  deleteCategory(id: number) {
    this.itemCategoryService.deleteItemCategory(id).subscribe(
      (res) => {
        console.log(res);
        this.loadData();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
