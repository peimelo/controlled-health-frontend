import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UnitsPageComponent } from './containers/units-page/units-page.component';
import { UnitsGuard } from './guards/units.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, UnitsGuard],
    component: UnitsPageComponent,
    data: { title: 'Units' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnitsRoutingModule {}
