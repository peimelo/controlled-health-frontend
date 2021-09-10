import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { ExamsFacadeService } from '../services/exams-facade.service';

@Injectable()
export class AllExamsExistsGuard implements CanActivate {
  constructor(private examsFacadeService: ExamsFacadeService) {}

  canActivate(): Observable<boolean> {
    return this.hasListLoaded();
  }

  hasListLoaded(): Observable<boolean> {
    return this.examsFacadeService.selectAllExamsLoaded$.pipe(
      tap((listLoaded) => {
        if (!listLoaded) {
          this.examsFacadeService.loadAll();
        }
      }),
      filter((listLoaded) => listLoaded),
      take(1)
    );
  }
}
