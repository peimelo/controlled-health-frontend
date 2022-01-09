import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountExistsGuard } from '../accounts/guards/account-exists.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { HeightsPageComponent } from './containers/heights-page/heights-page.component';
import { HeightsGuard } from './guards/heights.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, AccountExistsGuard, HeightsGuard],
    component: HeightsPageComponent,
    data: { title: 'Heights' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeightsRoutingModule {}
