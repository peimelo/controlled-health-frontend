import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from '../../../auth/models';
import { Weight } from '../../../shared/models';
import { WeightsFacadeService } from '../../services/weights-facade.service';

@Component({
  selector: 'app-weight-form-dialog-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './weight-form-dialog-page.component.html',
})
export class WeightFormDialogPageComponent {
  error$: Observable<any>;
  isLoading$: Observable<boolean>;
  user$: Observable<User>;
  weight: Weight;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private weightFacadeService: WeightsFacadeService
  ) {
    // this.error$ = this.store.pipe(select(fromWeightsSelectors.getWeightsError))
    // this.isLoading$ = this.store.pipe(select(fromWeightsSelectors.getWeightsLoading))
    // this.user$ = this.store.pipe(select(fromAuthSelectors.getUser))
    this.weight = this.data.weight;
  }

  onCreate(weight: Weight): void {
    this.weightFacadeService.createWeight(weight);
  }

  onUpdate(weight: Weight): void {
    this.weightFacadeService.updateWeight(weight);
  }
}
