import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from '../../../auth/models';
import { SpinnerFacadeService } from '../../../core/services/spinner-facade.service';
import { Exam, ExamResult, ExamResultRequest, Result } from '../../models';
import {
  ExamsFacadeService,
  ExamsResultsFacadeService,
  ResultsFacadeService,
} from '../../services';

interface DialogData {
  examResult: ExamResult;
}

@Component({
  selector: 'app-exam-result-form-dialog-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './exam-result-form-dialog-page.component.html',
})
export class ExamResultFormDialogPageComponent {
  allExams$: Observable<Exam[]>;
  examResult!: ExamResult;
  pending$: Observable<boolean>;
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
    this.examResult = this.data.examResult;
    this.pending$ = this.spinnerFacadeService.isLoading$;
    this.result$ = this.resultsFacadeService.selected$;
  }

  onCreate({ examResult, resultId }: ExamResultRequest): void {
    this.examsResultsFacadeService.create(examResult, resultId);
  }

  onUpdate({ examResult, resultId }: ExamResultRequest): void {
    this.examsResultsFacadeService.update(examResult, resultId);
  }
}
