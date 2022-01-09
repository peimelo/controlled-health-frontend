import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountExistsGuard } from '../accounts/guards/account-exists.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { WeightsPageComponent } from './containers/weights-page/weights-page.component';
import { WeightsGuard } from './guards/weights.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, AccountExistsGuard, WeightsGuard],
    component: WeightsPageComponent,
    data: { title: 'Weights' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeightsRoutingModule {}
