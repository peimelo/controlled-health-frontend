import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Exam } from '../../core/models';
import { BaseResourceService } from '../../core/services/base-resource.service';
import { ExamResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class ExamsService extends BaseResourceService<Exam> {
  constructor(protected override injector: Injector) {
    super(`${environment.baseUrl}/exams`, injector);
  }

  getAll(pageIndex: number, sort: Sort): Observable<ExamResponse> {
    const params = new HttpParams()
      .set('page', pageIndex.toString())
      .set('sort', sort.active)
      .set('dir', sort.direction);

    return this.http.get<ExamResponse>(this.apiPath, {
      params,
    });
  }
}
