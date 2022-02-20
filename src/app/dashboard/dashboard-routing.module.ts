import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountExistsGuard } from '../accounts/guards/account-exists.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { DashboardPageComponent } from './containers';
import { DashboardGuard } from './guards/dashboard.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, AccountExistsGuard, DashboardGuard],
    component: DashboardPageComponent,
    data: { title: 'Dashboard' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
