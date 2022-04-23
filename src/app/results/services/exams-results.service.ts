import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ExamResult, ExamResultResponse } from '../models';

@Injectable()
export class ExamsResultsService {
  constructor(private http: HttpClient) {}

  create(examResult: ExamResult, resultId: number): Observable<ExamResult> {
    return this.http.post<ExamResult>(
      `${environment.baseUrl}/results/${resultId}/exams_results`,
      { value: examResult.value, exam_id: examResult.exam.id }
    );
  }

  delete(id: number, resultId: number): Observable<any> {
    return this.http.delete<any>(
      `${environment.baseUrl}/results/${resultId}/exams_results/${id}`
    );
  }

  getAll(
    id: number,
    pageIndex: number,
    sort: Sort
  ): Observable<ExamResultResponse> {
    const params = new HttpParams()
      .set('page', pageIndex.toString())
      .set('sort', sort.active)
      .set('dir', sort.direction);

    return this.http.get<ExamResultResponse>(
      `${environment.baseUrl}/results/${id}/exams_results`,
      {
        params,
      }
    );
  }

  update(examResult: ExamResult, resultId: number): Observable<ExamResult> {
    return this.http.put<ExamResult>(
      `${environment.baseUrl}/results/${resultId}/exams_results/${examResult.id}`,
      { value: examResult.value, exam_id: examResult.exam.id }
    );
  }
}
