import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ExamGraphicResponse } from '../models/exam-graphic-response.model';

@Injectable()
export class ExamGraphicsService {
  constructor(private http: HttpClient) {}

  getOne(examId: number): Observable<ExamGraphicResponse> {
    return this.http.get<ExamGraphicResponse>(
      `${environment.baseUrl}/exams_graphics/${examId}`
    );
  }
}
