import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';
import { HeightFormDialogComponent } from './components/height-form-dialog/height-form-dialog.component';
import { HeightsComponent } from './components/heights/heights.component';
import { HeightFormDialogPageComponent } from './containers/height-form-dialog-page/height-form-dialog-page.component';
import { HeightsPageComponent } from './containers/heights-page/heights-page.component';
import { HeightsEffects } from './effects';
import { HeightsGuard } from './guards/heights.guard';
import { HeightsRoutingModule } from './heights-routing.module';
import * as fromHeight from './reducers';
import { HeightsFacadeService } from './services/heights-facade.service';
import { HeightsService } from './services/heights.service';

@NgModule({
  imports: [
    // @ngrx
    StoreModule.forFeature(fromHeight.heightsFeatureKey, fromHeight.reducers),
    EffectsModule.forFeature([HeightsEffects]),

    // third-party
    NgxMaskModule.forChild(),

    // app
    HeightsRoutingModule,
    SharedModule,
  ],
  declarations: [
    HeightsPageComponent,
    HeightsComponent,
    HeightFormDialogComponent,
    HeightFormDialogPageComponent,
  ],
  providers: [HeightsFacadeService, HeightsGuard, HeightsService],
})
export class HeightsModule {}
