import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {Dashboard} from '../models';

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${environment.baseUrl}/dashboards`);
  }
}
