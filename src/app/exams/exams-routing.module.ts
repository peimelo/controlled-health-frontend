import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUserGuard } from '../auth/guards/admin-user.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ExamsPageComponent } from './containers/exams-page/exams-page.component';
import { ExamsGuard } from './guards/exams.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, AdminUserGuard, ExamsGuard],
    component: ExamsPageComponent,
    data: { title: 'Exams' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamsRoutingModule {}
