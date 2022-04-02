import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUserGuard } from '../auth/guards/admin-user.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UnitsPageComponent } from './containers/units-page/units-page.component';
import { UnitsGuard } from './guards/units.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, AdminUserGuard, UnitsGuard],
    component: UnitsPageComponent,
    data: { title: 'Units' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnitsRoutingModule {}
