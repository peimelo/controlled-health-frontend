import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Weight } from '../../shared/models';
import { WeightResponse } from '../models';

@Injectable()
export class WeightsService {
  private url = `${environment.baseUrl}/weights`;

  constructor(private http: HttpClient) {}

  create(weight: Weight): Observable<Weight> {
    return this.http.post<Weight>(this.url, weight);
  }

  getAll(pageIndex: number): Observable<WeightResponse> {
    const httpParams = new HttpParams().set('page', pageIndex.toString());

    return this.http.get<WeightResponse>(this.url, {
      params: httpParams,
    });
  }

  getById(id: number): Observable<Weight> {
    return this.http.get<Weight>(`${this.url}/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  update(weight: Weight): Observable<Weight> {
    return this.http.put<Weight>(`${this.url}/${weight.id}`, weight);
  }
}
