import { FileData } from './file-data';
import { ItemCategory } from './item-category';

export interface Item {
  id: number;
  name: string;
  code: string;
  category: ItemCategory;
  subCategory?: ItemCategory;
  fileData: FileData;
  size: string;
  sizeUnit: string;
  weight: number;
  weightUnit: string;
  packingQty: number;
  packingUnit: string;
  minimumOrderQty: number;
  brand: string;
  saveDt: string;
  attribute: string;
}
