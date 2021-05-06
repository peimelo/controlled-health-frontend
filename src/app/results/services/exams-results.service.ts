import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ExamResultResponse } from '../models';

@Injectable()
export class ExamsResultsService {
  constructor(private http: HttpClient) {}

  getAll(id: number): Observable<ExamResultResponse> {
    return this.http.get<ExamResultResponse>(
      `${environment.baseUrl}/results/${id}/exams_results`
    );
  }
}
