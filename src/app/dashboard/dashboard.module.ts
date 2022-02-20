import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components';
import { DashboardPageComponent } from './containers';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardEffects } from './effects';
import { DashboardGuard } from './guards/dashboard.guard';
import * as fromDashboard from './reducers';
import { DashboardFacadeService } from './services/dashboard-facade.service';
import { DashboardService } from './services/dashboard.service';

@NgModule({
  imports: [
    // @angular
    CommonModule,

    // @ngrx
    StoreModule.forFeature(
      fromDashboard.dashboardFeatureKey,
      fromDashboard.reducers
    ),
    EffectsModule.forFeature([DashboardEffects]),

    // app
    DashboardRoutingModule,
    MaterialModule,
    SharedModule,
  ],
  declarations: [DashboardComponent, DashboardPageComponent],
  providers: [DashboardFacadeService, DashboardGuard, DashboardService],
})
export class DashboardModule {}
