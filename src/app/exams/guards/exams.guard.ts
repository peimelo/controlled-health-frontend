import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { ExamsFacadeService } from '../services';

@Injectable()
export class ExamsGuard implements CanActivate {
  constructor(private examsFacadeService: ExamsFacadeService) {}

  canActivate(): Observable<boolean> {
    return this.hasListLoaded();
  }

  hasListLoaded(): Observable<boolean> {
    return this.examsFacadeService.selectListLoaded$.pipe(
      tap((listLoaded) => {
        if (!listLoaded) {
          this.examsFacadeService.load();
        }
      }),
      filter((listLoaded) => listLoaded),
      take(1)
    );
  }
}
