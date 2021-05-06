import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';
import { ExamsResultsComponent } from './components/exams-results/exams-results.component';
import { ResultDetailComponent } from './components/result-detail/result-detail.component';
import { ResultFormDialogComponent } from './components/result-form-dialog/result-form-dialog.component';
import { ResultsComponent } from './components/results/results.component';
import { ResultDetailPageComponent } from './containers/result-detail-page/result-detail-page.component';
import { ResultFormDialogPageComponent } from './containers/result-form-dialog-page/result-form-dialog-page.component';
import { ResultsPageComponent } from './containers/results-page/results-page.component';
import * as fromEffects from './effects';
import { ResultExistsGuard } from './guards/result-exists.guard';
import * as fromResult from './reducers';
import { ResultsRoutingModule } from './results-routing.module';
import * as fromServices from './services';

@NgModule({
  imports: [
    // @ngrx
    StoreModule.forFeature(fromResult.resultsFeatureKey, fromResult.reducers),
    EffectsModule.forFeature([...fromEffects.effects]),

    // third-party
    NgxMaskModule.forChild(),

    // app
    ResultsRoutingModule,
    SharedModule,
  ],
  declarations: [
    ExamsResultsComponent,
    ResultsPageComponent,
    ResultsComponent,
    ResultDetailComponent,
    ResultDetailPageComponent,
    ResultFormDialogComponent,
    ResultFormDialogPageComponent,
  ],
  providers: [fromServices.services, ResultExistsGuard],
})
export class ResultsModule {}
