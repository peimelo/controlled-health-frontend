import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from '../../../auth/models';
import { SpinnerFacadeService } from '../../../core/services/spinner-facade.service';
import { Exam, Result } from '../../models';
import {
  ExamsFacadeService,
  ExamsResultsFacadeService,
  ResultsFacadeService,
} from '../../services';

interface DialogData {}
@Component({
  selector: 'app-exam-result-form-dialog-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './exam-result-form-dialog-page.component.html',
})
export class ExamResultFormDialogPageComponent {
  allExams$: Observable<Exam[]>;
  error$!: Observable<any>;
  pending$ = this.spinnerFacadeService.isLoading$;
  user$!: Observable<User>;
  result$: Observable<Result | null>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private examsFacadeService: ExamsFacadeService,
    private examsResultsFacadeService: ExamsResultsFacadeService,
    private resultsFacadeService: ResultsFacadeService,
    private spinnerFacadeService: SpinnerFacadeService
  ) {
    this.allExams$ = this.examsFacadeService.allExams$;
    this.result$ = this.resultsFacadeService.selected$;
  }

  onCreate(event: any): void {
    const { examResult, resultId } = event;

    this.examsResultsFacadeService.create(examResult, resultId);
  }

  onUpdate(): void {
    // this.weightFacadeService.update(weight);
  }
}
