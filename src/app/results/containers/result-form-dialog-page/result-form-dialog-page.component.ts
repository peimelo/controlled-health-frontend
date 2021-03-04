import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from '../../../auth/models';
import { Result } from '../../models';
import { ResultsFacadeService } from '../../services/results-facade.service';

interface DialogData {
  result: Result;
}
@Component({
  selector: 'app-result-form-dialog-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './result-form-dialog-page.component.html',
})
export class ResultFormDialogPageComponent {
  error$!: Observable<any>;
  isLoading$!: Observable<boolean>;
  user$!: Observable<User>;
  result!: Result;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private resultFacadeService: ResultsFacadeService
  ) {
    // this.error$ = this.store.pipe(select(fromResultsSelectors.getResultsError))
    // this.isLoading$ = this.store.pipe(select(fromResultsSelectors.getResultsLoading))
    // this.user$ = this.store.pipe(select(fromAuthSelectors.getUser))
    this.result = this.data.result;
  }

  onCreate(result: Result): void {
    this.resultFacadeService.createResult(result);
  }

  onUpdate(result: Result): void {
    this.resultFacadeService.updateResult(result);
  }
}
