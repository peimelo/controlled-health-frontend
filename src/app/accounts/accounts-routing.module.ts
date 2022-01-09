import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AccountsPageComponent } from './containers/accounts-page/accounts-page.component';

const routes: Routes = [
  {
    path: 'accounts',
    canActivate: [AuthGuard],
    component: AccountsPageComponent,
    data: { title: 'Accounts' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
