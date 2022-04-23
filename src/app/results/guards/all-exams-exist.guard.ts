import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { AllExamsFacadeService } from '../services';

@Injectable()
export class AllExamsExistGuard implements CanActivate {
  constructor(private allExamsFacadeService: AllExamsFacadeService) {}

  canActivate(): Observable<boolean> {
    return this.hasListLoaded();
  }

  hasListLoaded(): Observable<boolean> {
    return this.allExamsFacadeService.selectAllExamsLoaded$.pipe(
      tap((listLoaded) => {
        if (!listLoaded) {
          this.allExamsFacadeService.loadAll();
        }
      }),
      filter((listLoaded) => listLoaded),
      take(1)
    );
  }
}
