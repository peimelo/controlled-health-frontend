import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Unit } from '../../core/models';
import { AllUnitsExistGuardActions } from '../actions';
import * as fromUnits from '../reducers';

@Injectable()
export class AllUnitsFacadeService {
  allUnits$: Observable<ReadonlyArray<Unit>>;
  selectAllUnitsLoaded$: Observable<boolean>;

  constructor(private store: Store<fromUnits.State>) {
    this.allUnits$ = this.store.pipe(select(fromUnits.selectUnits));

    this.selectAllUnitsLoaded$ = this.store.pipe(
      select(fromUnits.selectAllUnitsLoaded)
    );
  }

  loadAll(): void {
    this.store.dispatch(AllUnitsExistGuardActions.loadAllUnits());
  }
}
