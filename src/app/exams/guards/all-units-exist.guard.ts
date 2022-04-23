import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { filter, Observable, take, tap } from 'rxjs';
import { AllUnitsFacadeService } from '../services';

@Injectable()
export class AllUnitsExistGuard implements CanActivate {
  constructor(private allUnitsFacadeService: AllUnitsFacadeService) {}

  canActivate(): Observable<boolean> {
    return this.hasListLoaded();
  }

  hasListLoaded(): Observable<boolean> {
    return this.allUnitsFacadeService.selectAllUnitsLoaded$.pipe(
      tap((listLoaded) => {
        if (!listLoaded) {
          this.allUnitsFacadeService.loadAll();
        }
      }),
      filter((listLoaded) => listLoaded),
      take(1)
    );
  }
}
