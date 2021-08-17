import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from '../../../auth/models';
import { SpinnerFacadeService } from '../../../core/services/spinner-facade.service';
import { Weight } from '../../../shared/models';

interface DialogData {
  weight: Weight;
}
@Component({
  selector: 'app-exam-result-form-dialog-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './exam-result-form-dialog-page.component.html',
})
export class ExamResultFormDialogPageComponent {
  error$!: Observable<any>;
  pending$ = this.spinnerFacadeService.isLoading$;
  user$!: Observable<User>;
  weight!: Weight;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private spinnerFacadeService: SpinnerFacadeService
  ) // private weightFacadeService: WeightsFacadeService
  {
    this.weight = this.data.weight;
  }

  onCreate(weight: Weight): void {
    // this.weightFacadeService.create(weight);
  }

  onUpdate(weight: Weight): void {
    // this.weightFacadeService.update(weight);
  }
}
