import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemCategory } from '../interfaces/item-category';

@Injectable({
  providedIn: 'root',
})
export class ItemCategoryService {
  private url: string = `${environment.url}/${environment.itemCategory}`;
  private http: HttpClient = inject(HttpClient);

  createItemCategory(payload: ItemCategory): Observable<HttpResponseBase> {
    return this.http.post<HttpResponseBase>(this.url, payload);
  }

  getItemCategories(limit: number, offset: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${limit}/${offset}`);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.url}`);
  }

  getItemCategory(id: number): Observable<ItemCategory> {
    return this.http.get<ItemCategory>(`${this.url}/${id}`);
  }

  updateItemCategory(payload: ItemCategory): Observable<ItemCategory> {
    return this.http.put<ItemCategory>(`${this.url}`, payload);
  }

  deleteItemCategory(id: number): Observable<HttpResponseBase> {
    return this.http.delete<HttpResponseBase>(`${this.url}/${id}`);
  }
}
