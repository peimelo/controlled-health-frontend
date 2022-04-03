import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUserGuard } from '../auth/guards/admin-user.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ReferencesPageComponent } from './containers/references-page/references-page.component';
import { ReferencesGuard } from './guards/references.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, AdminUserGuard, ReferencesGuard],
    component: ReferencesPageComponent,
    data: { title: 'References' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferencesRoutingModule {}
