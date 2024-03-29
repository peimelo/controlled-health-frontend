import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from '../../../auth/models';
import { Exam } from '../../../core/models';
import { SpinnerFacadeService } from '../../../core/services/spinner-facade.service';
import { ExamResult, ExamResultRequest, Result } from '../../models';
import {
  AllExamsFacadeService,
  ExamsResultsFacadeService,
  ResultsFacadeService,
} from '../../services';

interface DialogData {
  examResult: ExamResult;
}

@Component({
  selector: 'app-exam-result-form-dialog-page',
  templateUrl: './exam-result-form-dialog-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamResultFormDialogPageComponent {
  allExams$: Observable<ReadonlyArray<Exam>>;
  examResult!: ExamResult;
  pending$: Observable<boolean>;
  user$!: Observable<User>;
  result$: Observable<Result | null>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private allExamsFacadeService: AllExamsFacadeService,
    private examsResultsFacadeService: ExamsResultsFacadeService,
    private resultsFacadeService: ResultsFacadeService,
    private spinnerFacadeService: SpinnerFacadeService
  ) {
    this.allExams$ = this.allExamsFacadeService.allExams$;
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
