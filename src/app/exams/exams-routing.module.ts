import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUserGuard } from '../auth/guards/admin-user.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ExamDetailPageComponent } from './containers';
import { ExamsPageComponent } from './containers/exams-page/exams-page.component';
import { AllUnitsExistGuard } from './guards/all-units-exist.guard';
import { ExamExistsGuard } from './guards/exam-exists.guard';
import { ExamsGuard } from './guards/exams.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, AdminUserGuard, ExamsGuard],
    component: ExamsPageComponent,
    data: { title: 'Exams' },
  },
  {
    path: 'new',
    canActivate: [AuthGuard, AdminUserGuard, AllUnitsExistGuard],
    component: ExamDetailPageComponent,
    data: { title: 'Create Exam' },
  },
  {
    path: ':id',
    canActivate: [
      AuthGuard,
      AdminUserGuard,
      ExamExistsGuard,
      AllUnitsExistGuard,
    ],
    component: ExamDetailPageComponent,
    data: { title: 'Update Exam' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamsRoutingModule {}
