import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxMaskModule } from 'ngx-mask';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { WeightFormDialogComponent } from './components/weight-form-dialog/weight-form-dialog.component';
import { WeightsComponent } from './components/weights/weights.component';
import { WeightFormDialogPageComponent } from './containers/weight-form-dialog-page/weight-form-dialog-page.component';
import { WeightsPageComponent } from './containers/weights-page/weights-page.component';
import { WeightsEffects } from './effects';
import { WeightsGuard } from './guards/weights.guard';
import * as fromWeight from './reducers';
import { WeightsFacadeService } from './services/weights-facade.service';
import { WeightsService } from './services/weights.service';
import { WeightsRoutingModule } from './weights-routing.module';

@NgModule({
  imports: [
    // @angular
    CommonModule,
    ReactiveFormsModule,

    // @ngrx
    StoreModule.forFeature(fromWeight.weightsFeatureKey, fromWeight.reducers),
    EffectsModule.forFeature([WeightsEffects]),

    // third-party
    FlexLayoutModule,
    NgxMaskModule.forChild(),
    // app
    MaterialModule,
    SharedModule,
    WeightsRoutingModule,
  ],
  declarations: [
    WeightsPageComponent,
    WeightsComponent,
    WeightFormDialogComponent,
    WeightFormDialogPageComponent,
  ],
  providers: [WeightsFacadeService, WeightsGuard, WeightsService],
})
export class WeightsModule {}
