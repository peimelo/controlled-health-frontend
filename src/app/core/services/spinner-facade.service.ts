import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../reducers';
import { SpinnerActions } from '../actions';

@Injectable()
export class SpinnerFacadeService {
  showSpinner$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.showSpinner$ = this.store.pipe(select(fromRoot.selectShowSpinner));
  }

  hide(): void {
    this.store.dispatch(SpinnerActions.hideSpinner());
  }

  show(): void {
    this.store.dispatch(SpinnerActions.showSpinner());
  }
}
