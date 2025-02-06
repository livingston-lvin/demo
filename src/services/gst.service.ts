import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpParams, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gst } from '../interfaces/gst';

@Injectable({
  providedIn: 'root',
})
export class GstService {
  private url: string = `${environment.url}/${environment.gstMaster}`;
  private http: HttpClient = inject(HttpClient);

  create(payload: Gst): Observable<HttpResponseBase> {
    return this.http.post<HttpResponseBase>(this.url, payload);
  }

  getGsts(limit: number, offset: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${limit}/${offset}`);
  }

  getGst(id: number): Observable<Gst> {
    return this.http.get<Gst>(`${this.url}/${id}`);
  }

  updateGst(payload: Gst): Observable<Gst> {
    return this.http.put<Gst>(`${this.url}`, payload);
  }

  deleteGst(id: number): Observable<HttpResponseBase> {
    return this.http.delete<HttpResponseBase>(`${this.url}/${id}`);
  }

  getValidGsts(): Observable<Gst> {
    return this.http.get<Gst>(`${this.url}/valid`);
  }

  search(payload: any): Observable<any> {
    return this.http.post<any>(`${this.url}/search`, payload);
  }
}
