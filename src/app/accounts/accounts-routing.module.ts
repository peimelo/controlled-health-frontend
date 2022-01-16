import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AccountsPageComponent } from './containers/accounts-page/accounts-page.component';
import { AccountsGuard } from './guards/accounts.guard';

const routes: Routes = [
  {
    path: 'profiles',
    canActivate: [AuthGuard, AccountsGuard],
    component: AccountsPageComponent,
    data: { title: 'Profiles' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
