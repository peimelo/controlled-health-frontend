import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { ResultsFacadeService } from '../services/results-facade.service';

@Injectable()
export class ResultExistsGuard implements CanActivate {
  constructor(private resultFacadeService: ResultsFacadeService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasSelectedLoaded(route.params['id']);
  }

  hasSelectedLoaded(id: string): Observable<boolean> {
    return this.resultFacadeService.selectedLoaded$.pipe(
      tap((selectedLoaded) => {
        if (!selectedLoaded) {
          this.resultFacadeService.loadResult(+id);
        }
      }),
      filter((selectedLoaded) => selectedLoaded),
      take(1)
    );
  }
}
