import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxMaskModule } from 'ngx-mask';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { UnitFormDialogComponent } from './components/unit-form-dialog/unit-form-dialog.component';
import { UnitsComponent } from './components/units/units.component';
import { UnitFormDialogPageComponent } from './containers/unit-form-dialog-page/unit-form-dialog-page.component';
import { UnitsPageComponent } from './containers/units-page/units-page.component';
import { UnitsEffects } from './effects';
import { UnitsGuard } from './guards/units.guard';
import * as fromUnit from './reducers';
import { UnitsFacadeService } from './services/units-facade.service';
import { UnitsRoutingModule } from './units-routing.module';

@NgModule({
  imports: [
    // @angular
    CommonModule,
    ReactiveFormsModule,

    // @ngrx
    StoreModule.forFeature(fromUnit.unitsFeatureKey, fromUnit.reducers),
    EffectsModule.forFeature([UnitsEffects]),

    // third-party
    FlexLayoutModule,
    NgxMaskModule.forChild(),

    // app
    UnitsRoutingModule,
    MaterialModule,
    SharedModule,
  ],
  declarations: [
    UnitsPageComponent,
    UnitsComponent,
    UnitFormDialogComponent,
    UnitFormDialogPageComponent,
  ],
  providers: [UnitsFacadeService, UnitsGuard],
})
export class UnitsModule {}
