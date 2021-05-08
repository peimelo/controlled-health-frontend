import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ExamResultResponse } from '../models';

@Injectable()
export class ExamsResultsService {
  constructor(private http: HttpClient) {}

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
