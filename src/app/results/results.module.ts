import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxMaskModule } from 'ngx-mask';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import {
  ExamResultFormDialogComponent,
  ExamsResultsComponent,
  ResultDetailComponent,
  ResultsComponent,
} from './components';
import {
  ExamResultFormDialogPageComponent,
  ResultDetailPageComponent,
  ResultsPageComponent,
} from './containers';
import * as fromEffects from './effects';
import { AllExamsExistsGuard } from './guards/all-exams-exists.guard';
import { ResultExistsGuard } from './guards/result-exists.guard';
import { ResultsGuard } from './guards/results.guard';
import * as fromResult from './reducers';
import { ResultsRoutingModule } from './results-routing.module';
import * as fromServices from './services';

@NgModule({
  imports: [
    // @angular
    CommonModule,
    ReactiveFormsModule,

    // @ngrx
    StoreModule.forFeature(fromResult.resultsFeatureKey, fromResult.reducers),
    EffectsModule.forFeature([...fromEffects.effects]),

    // third-party
    FlexLayoutModule,
    NgxMaskModule.forChild(),

    // app
    MaterialModule,
    ResultsRoutingModule,
    SharedModule,
  ],
  declarations: [
    ExamResultFormDialogComponent,
    ExamResultFormDialogPageComponent,
    ExamsResultsComponent,
    ResultsPageComponent,
    ResultsComponent,
    ResultDetailComponent,
    ResultDetailPageComponent,
  ],
  providers: [
    fromServices.services,
    AllExamsExistsGuard,
    ResultExistsGuard,
    ResultsGuard,
  ],
})
export class ResultsModule {}
