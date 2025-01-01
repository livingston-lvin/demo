import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemCategory } from '../interfaces/item-category';

@Injectable({
  providedIn: 'root'
})
export class ItemCategoryService {
  private url: string = `${environment.url}/${environment.itemCategory}`;
  private http: HttpClient = inject(HttpClient);

  createItemCategory(payload:ItemCategory):Observable<HttpResponseBase>{
    return this.http.post<HttpResponseBase>(this.url,payload);
  }
}
