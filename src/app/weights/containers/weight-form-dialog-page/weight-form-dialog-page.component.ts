import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Weight } from '../../../core/models';
import { SpinnerFacadeService } from '../../../core/services/spinner-facade.service';
import { WeightsFacadeService } from '../../services/weights-facade.service';

interface DialogData {
  weight: Weight;
}

@Component({
  selector: 'app-weight-form-dialog-page',
  templateUrl: './weight-form-dialog-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeightFormDialogPageComponent {
  pending$: Observable<boolean>;
  weight!: Weight;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private spinnerFacadeService: SpinnerFacadeService,
    private weightFacadeService: WeightsFacadeService
  ) {
    this.pending$ = this.spinnerFacadeService.isLoading$;
    this.weight = this.data.weight;
  }

  onCreate(weight: Weight): void {
    this.weightFacadeService.create(weight);
  }

  onUpdate(weight: Weight): void {
    this.weightFacadeService.update(weight);
  }
}
