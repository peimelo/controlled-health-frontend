import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ExamsFacadeService } from '../services/exams-facade.service';

@Injectable()
export class AllUnitsExistsGuard implements CanActivate {
  constructor(private examsFacadeService: ExamsFacadeService) {}

  canActivate(): Observable<boolean> {
    return of(true);
    // return this.hasListLoaded();
  }

  // hasListLoaded(): Observable<boolean> {
  //   return this.examsFacadeService.selectAllExamsLoaded$.pipe(
  //     tap((listLoaded) => {
  //       if (!listLoaded) {
  //         this.examsFacadeService.loadAll();
  //       }
  //     }),
  //     filter((listLoaded) => listLoaded),
  //     take(1)
  //   );
  // }
}
