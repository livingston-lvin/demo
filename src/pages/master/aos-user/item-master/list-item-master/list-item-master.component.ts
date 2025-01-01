import { Component } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Item } from '../../../../../interfaces/item';
import { MatIconModule } from '@angular/material/icon';
import { PaginatorComponent } from '../../../../../components/paginator/paginator.component';
import {MatSelectModule} from '@angular/material/select';
@Component({
  selector: 'app-list-item-master',
  templateUrl: './list-item-master.component.html',
  styleUrl: './list-item-master.component.scss',
  imports: [MatInputModule, MatButtonModule, MatIconModule, PaginatorComponent,MatSelectModule,MatIconButton],
})
export class ListItemMasterComponent {
loadData() {
throw new Error('Method not implemented.');
}
  items: Item[] = [
    {
      id: 1,
      name: 'Sample Item 1',
      code: 'ITEM001',
      category: { id: 1, name: 'Electronics', saveDt: '2024-12-30T10:00:00Z' },
      subCategory: {
        id: 11,
        name: 'Mobile Phones',
        saveDt: '2024-12-30T10:00:00Z',
      },
      imgUrls: [new File([''], 'image1.jpg'), new File([''], 'image2.jpg')],
      size: 10,
      sizeUnit: 'cm',
      weight: 0.5,
      weightUnit: 'kg',
      packingQty: 10,
      packingUnit: 'pcs',
      minimumOrderQty: 5,
      brand: 'Brand A',
      saveDt: '2024-12-30T10:00:00Z',
    },
    {
      id: 2,
      name: 'Sample Item 2',
      code: 'ITEM002',
      category: { id: 2, name: 'Furniture', saveDt: '2024-12-30T10:00:00Z' },
      subCategory: { id: 21, name: 'Chairs', saveDt: '2024-12-30T10:00:00Z' },
      imgUrls: [new File([''], 'image3.jpg')],
      size: 120,
      sizeUnit: 'cm',
      weight: 10,
      weightUnit: 'kg',
      packingQty: 2,
      packingUnit: 'set',
      minimumOrderQty: 1,
      brand: 'Brand B',
      saveDt: '2024-12-29T15:30:00Z',
    },
    {
      id: 3,
      name: 'Sample Item 3',
      code: 'ITEM003',
      category: { id: 3, name: 'Stationery', saveDt: '2024-12-30T10:00:00Z' },
      subCategory: {
        id: 31,
        name: 'Notebooks',
        saveDt: '2024-12-30T10:00:00Z',
      },
      imgUrls: [new File([''], 'image4.jpg'), new File([''], 'image5.jpg')],
      size: 20,
      sizeUnit: 'cm',
      weight: 0.2,
      weightUnit: 'kg',
      packingQty: 50,
      packingUnit: 'pcs',
      minimumOrderQty: 10,
      brand: 'Brand C',
      saveDt: '2024-12-28T08:45:00Z',
    },
  ];
  rows: number[] = [5, 10, 20];
  limit: number = this.rows[2];
  offset: number = 0;
  // how many pages to be displayed in paginator component
  size: number = 0;
  // indicates current page in the paginator component
  page: number = 0;
  searchTxt!: string;

  constructor() {
    this.size = 11;
    this.page = 1;
  }

  onSelectRow() {
    this.offset = (this.page - 1) * this.limit;
    console.log(this.limit, this.offset);
  }

  navigate(targetPage: any) {
    this.page = targetPage;
    this.offset = (targetPage - 1) * this.limit;
  }
}
