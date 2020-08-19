import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
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
} from '@fortawesome/pro-solid-svg-icons';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { WeightsComponent } from './components/weights/weights.component';
import { WeightsPageComponent } from './containers/weights-page/weights-page.component';
import { WeightsEffects } from './effects';
import { WeightsGuard } from './guards/weights.guard';
import { FormatDatetimeUtcPipe } from './pipes/format-datetime-utc.pipe';
import * as fromWeight from './reducers';
import { ConfirmationDialogService } from './services/confirmation-dialog.service';
import { WeightsFacadeService } from './services/weights-facade.service';
import { WeightsService } from './services/weights.service';
import { WeightsRoutingModule } from './weights-routing.module';

@NgModule({
  imports: [
    // Angular
    CommonModule,

    // Material
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,

    // icons
    FontAwesomeModule,

    // @ngrx
    StoreModule.forFeature(fromWeight.weightsFeatureKey, fromWeight.reducers),
    EffectsModule.forFeature([WeightsEffects]),

    // App
    WeightsRoutingModule,
  ],
  declarations: [
    ConfirmationDialogComponent,
    FormatDatetimeUtcPipe,
    WeightsPageComponent,
    WeightsComponent,
  ],
  // entryComponents: [
  //   fromContainers.WeightFormDialogPageComponent
  // ],
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
