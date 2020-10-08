import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import * as fromContainers from './containers';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: fromContainers.DashboardPageComponent,
    data: { title: 'Dashboard' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
