import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
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
import { WeightsComponent } from './components/weights/weights.component';
import { WeightsPageComponent } from './containers/weights-page/weights-page.component';
import { WeightsEffects } from './effects';
import { WeightsGuard } from './guards/weights.guard';
import { FormatDatetimeUtcPipe } from './pipes/format-datetime-utc.pipe';
import * as fromWeight from './reducers';
import { WeightsFacadeService } from './services/weights-facade.service';
import { WeightsService } from './services/weights.service';
import { WeightsRoutingModule } from './weights-routing.module';

@NgModule({
  imports: [
    // Angular
    CommonModule,

    // Material
    MatButtonModule,
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
  declarations: [FormatDatetimeUtcPipe, WeightsPageComponent, WeightsComponent],
  // entryComponents: [
  //   fromContainers.WeightFormDialogPageComponent
  // ],
  providers: [WeightsFacadeService, WeightsGuard, WeightsService],
})
export class WeightsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faPencilAlt, faPlus, faTrashAlt);
  }
}
