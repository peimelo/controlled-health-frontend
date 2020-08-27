import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faPencilAlt,
  faPlus,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { WeightFormDialogComponent } from './components/weight-form-dialog/weight-form-dialog.component';
import { WeightsComponent } from './components/weights/weights.component';
import { WeightFormDialogPageComponent } from './containers/weight-form-dialog-page/weight-form-dialog-page.component';
import { WeightsPageComponent } from './containers/weights-page/weights-page.component';
import { WeightsEffects } from './effects';
import { WeightsGuard } from './guards/weights.guard';
import { FormatDatetimeUtcPipe } from './pipes/format-datetime-utc.pipe';
import * as fromWeight from './reducers';
import { ConfirmationDialogService } from './services/confirmation-dialog.service';
import { WeightsFacadeService } from './services/weights-facade.service';
import { WeightsService } from './services/weights.service';
import { WeightsRoutingModule } from './weights-routing.module';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    // Material
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,

    // @ngrx
    StoreModule.forFeature(fromWeight.weightsFeatureKey, fromWeight.reducers),
    EffectsModule.forFeature([WeightsEffects]),

    // third-party
    FontAwesomeModule,
    NgxMaskModule.forChild(),

    // app
    WeightsRoutingModule,
  ],
  declarations: [
    ConfirmationDialogComponent,
    FormatDatetimeUtcPipe,
    WeightsPageComponent,
    WeightsComponent,
    WeightFormDialogComponent,
    WeightFormDialogPageComponent,
  ],
  entryComponents: [WeightFormDialogPageComponent],
  providers: [
    ConfirmationDialogService,
    WeightsFacadeService,
    WeightsGuard,
    WeightsService,
  ],
})
export class WeightsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faPencilAlt, faPlus, faTrashAlt);
  }
}
