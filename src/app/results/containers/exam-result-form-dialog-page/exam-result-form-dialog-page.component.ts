import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from '../../../auth/models';
import { SpinnerFacadeService } from '../../../core/services/spinner-facade.service';
import { Exam } from '../../models';
import { ExamsFacadeService } from '../../services';

interface DialogData {}
@Component({
  selector: 'app-exam-result-form-dialog-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './exam-result-form-dialog-page.component.html',
})
export class ExamResultFormDialogPageComponent {
  error$!: Observable<any>;
  pending$ = this.spinnerFacadeService.isLoading$;
  user$!: Observable<User>;
  allExams$: Observable<Exam[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private examsFacadeService: ExamsFacadeService,
    private spinnerFacadeService: SpinnerFacadeService
  ) {
    this.allExams$ = this.examsFacadeService.allExams$;
  }

  onCreate(): void {
    // this.weightFacadeService.create(weight);
  }

  onUpdate(): void {
    // this.weightFacadeService.update(weight);
  }
}
