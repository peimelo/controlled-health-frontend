import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { WeightsFacadeService } from '../services/weights-facade.service';

@Injectable()
export class WeightsGuard implements CanActivate {
  constructor(private weightsFacade: WeightsFacadeService) {}

  canActivate(): Observable<boolean> {
    return this.hasListLoaded();
  }

  hasListLoaded(): Observable<boolean> {
    return this.weightsFacade.selectListLoaded$.pipe(
      tap((listLoaded) => {
        if (!listLoaded) {
          this.weightsFacade.loadWeights(1);
        }
      }),
      filter((listLoaded) => listLoaded),
      take(1)
    );
  }
}
