import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardEffects } from './effects';
import * as fromDashboard from './reducers';
import { DashboardFacadeService } from './services/dashboard-facade.service';
import { DashboardService } from './services/dashboard.service';

@NgModule({
  imports: [
    DashboardRoutingModule,

    // @ngrx
    StoreModule.forFeature(
      fromDashboard.dashboardFeatureKey,
      fromDashboard.reducers
    ),
    EffectsModule.forFeature([DashboardEffects]),

    // app
    SharedModule,
  ],
  declarations: [...fromComponents.components, ...fromContainers.containers],
  exports: [...fromComponents.components, ...fromContainers.containers],
  providers: [DashboardFacadeService, DashboardService],
})
export class DashboardModule {}
