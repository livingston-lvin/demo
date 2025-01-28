import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpParams, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gst } from '../interfaces/gst';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private url: string = `${environment.url}/${environment.file}`;
  private http: HttpClient = inject(HttpClient);

  download(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`, { responseType: 'blob' });
  }
}
