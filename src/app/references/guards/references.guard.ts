import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { ReferencesFacadeService } from '../services/references-facade.service';

@Injectable()
export class ReferencesGuard implements CanActivate {
  constructor(private referencesFacadeService: ReferencesFacadeService) {}

  canActivate(): Observable<boolean> {
    return this.hasListLoaded();
  }

  hasListLoaded(): Observable<boolean> {
    return this.referencesFacadeService.selectListLoaded$.pipe(
      tap((listLoaded) => {
        if (!listLoaded) {
          this.referencesFacadeService.load();
        }
      }),
      filter((listLoaded) => listLoaded),
      take(1)
    );
  }
}
