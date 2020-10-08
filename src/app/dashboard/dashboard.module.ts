import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardEffects } from './effects';
import * as fromDashboard from './reducers';
import { DashboardFacadeService } from './services/dashboard-facade.service';
import { DashboardService } from './services/dashboard.service';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FlexLayoutModule,
    NgxChartsModule,

    // Material
    MatCardModule,
    MatGridListModule,

    // @ngrx
    StoreModule.forFeature(
      fromDashboard.dashboardFeatureKey,
      fromDashboard.reducers
    ),
    EffectsModule.forFeature([DashboardEffects]),
  ],
  declarations: [...fromComponents.components, ...fromContainers.containers],
  exports: [...fromComponents.components, ...fromContainers.containers],
  providers: [DashboardFacadeService, DashboardService],
})
export class DashboardModule {}
