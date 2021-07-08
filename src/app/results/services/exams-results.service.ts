import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ExamResult, ExamResultResponse, Result } from '../models';
import { BaseResourceService } from '../../shared/services/base-resource.service';

@Injectable()
export class ExamsResultsService {
  constructor(private http: HttpClient) {
  }

  delete(id: number, resultId: number): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/results/${resultId}/exams_results/${id}`);
  }

  getAll(
    id: number,
    pageIndex: number,
    sort: Sort
  ): Observable<ExamResultResponse> {
    const httpParams = new HttpParams()
      .set('page', pageIndex.toString())
      .set('sort', sort.active)
      .set('dir', sort.direction);

    return this.http.get<ExamResultResponse>(
      `${environment.baseUrl}/results/${id}/exams_results`,
      {
        params: httpParams,
      }
    );
  }
}
