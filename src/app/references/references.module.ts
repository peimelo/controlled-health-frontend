import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxMaskModule } from 'ngx-mask';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReferenceFormDialogComponent } from './components/reference-form-dialog/reference-form-dialog.component';
import { ReferencesComponent } from './components/references/references.component';
import { ReferenceFormDialogPageComponent } from './containers/reference-form-dialog-page/reference-form-dialog-page.component';
import { ReferencesPageComponent } from './containers/references-page/references-page.component';
import { ReferencesEffects } from './effects';
import { ReferencesGuard } from './guards/references.guard';
import * as fromReference from './reducers';
import { ReferencesFacadeService } from './services/references-facade.service';
import { ReferencesService } from './services/references.service';
import { ReferencesRoutingModule } from './references-routing.module';

@NgModule({
  imports: [
    // @angular
    CommonModule,
    ReactiveFormsModule,

    // @ngrx
    StoreModule.forFeature(fromReference.referencesFeatureKey, fromReference.reducers),
    EffectsModule.forFeature([ReferencesEffects]),

    // third-party
    FlexLayoutModule,
    NgxMaskModule.forChild(),

    // app
    ReferencesRoutingModule,
    MaterialModule,
    SharedModule,
  ],
  declarations: [
    ReferencesPageComponent,
    ReferencesComponent,
    ReferenceFormDialogComponent,
    ReferenceFormDialogPageComponent,
  ],
  providers: [ReferencesFacadeService, ReferencesGuard, ReferencesService],
})
export class ReferencesModule {}
