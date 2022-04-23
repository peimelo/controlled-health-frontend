import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { ExamsFacadeService } from '../services';

@Injectable()
export class ExamExistsGuard implements CanActivate {
  constructor(private examFacadeService: ExamsFacadeService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasSelectedLoaded(route.params['id']);
  }

  hasSelectedLoaded(id: string): Observable<boolean> {
    return this.examFacadeService.selectedLoaded$.pipe(
      tap((selectedLoaded) => {
        if (!selectedLoaded) {
          this.examFacadeService.loadExam(+id);
        }
      }),
      filter((selectedLoaded) => selectedLoaded),
      take(1)
    );
  }
}
