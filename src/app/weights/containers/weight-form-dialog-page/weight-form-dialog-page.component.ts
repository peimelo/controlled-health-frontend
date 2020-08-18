import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../auth/models';
import * as fromAuthSelectors from '../../../auth/store/selectors';
import * as fromRoot from '../../../store';
import { Weight } from '../../models';
import { WeightsActions } from '../../store/actions';
import * as fromWeightsSelectors from '../../store/selectors';

@Component({
  selector: 'app-weight-form-dialog-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './weight-form-dialog-page.component.html'
})
export class WeightFormDialogPageComponent {
  error$: Observable<any>;
  isLoading$: Observable<boolean>;
  user$: Observable<User>;
  weight: Weight;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private store: Store<fromRoot.State>,
  ) {
    this.error$ = this.store.pipe(select(fromWeightsSelectors.getWeightsError))
    this.isLoading$ = this.store.pipe(select(fromWeightsSelectors.getWeightsLoading))
    this.user$ = this.store.pipe(select(fromAuthSelectors.getUser))
    this.weight = data.weight;
  }

  onCreate(weight: Weight) {
    this.store.dispatch(WeightsActions.createWeight({ weight }));
  }

  onUpdate(weight: Weight) {
    this.store.dispatch(WeightsActions.updateWeight({ weight }));
  }
}
