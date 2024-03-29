import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Exam } from '../../core/models';
import { AllExamsExistGuardActions } from '../actions';
import * as fromExams from '../reducers';

@Injectable()
export class AllExamsFacadeService {
  allExams$: Observable<ReadonlyArray<Exam>>;
  selectAllExamsLoaded$: Observable<boolean>;

  constructor(private store: Store<fromExams.State>) {
    this.allExams$ = this.store.pipe(select(fromExams.selectExams));

    this.selectAllExamsLoaded$ = this.store.pipe(
      select(fromExams.selectAllExamsLoaded)
    );
  }

  loadAll(): void {
    this.store.dispatch(AllExamsExistGuardActions.loadAllExams());
  }
}
