import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxMaskModule } from 'ngx-mask';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ExamDetailComponent } from './components';
import { ExamsComponent } from './components/exams/exams.component';
import { ExamDetailPageComponent } from './containers';
import { ExamsPageComponent } from './containers/exams-page/exams-page.component';
import * as fromEffects from './effects';
import { ExamsRoutingModule } from './exams-routing.module';
import { AllUnitsExistGuard } from './guards/all-units-exist.guard';
import { ExamExistsGuard } from './guards/exam-exists.guard';
import { ExamsGuard } from './guards/exams.guard';
import * as fromExam from './reducers';
import * as fromServices from './services';

@NgModule({
  imports: [
    // @angular
    CommonModule,
    ReactiveFormsModule,

    // @ngrx
    StoreModule.forFeature(fromExam.examsFeatureKey, fromExam.reducers),
    EffectsModule.forFeature([...fromEffects.effects]),

    // third-party
    FlexLayoutModule,
    NgxMaskModule.forChild(),

    // app
    ExamsRoutingModule,
    MaterialModule,
    SharedModule,
  ],
  declarations: [
    ExamDetailComponent,
    ExamDetailPageComponent,
    ExamsComponent,
    ExamsPageComponent,
  ],
  providers: [
    fromServices.services,
    AllUnitsExistGuard,
    ExamExistsGuard,
    ExamsGuard,
  ],
})
export class ExamsModule {}
