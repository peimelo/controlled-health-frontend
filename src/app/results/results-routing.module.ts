import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountExistsGuard } from '../accounts/guards/account-exists.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ResultDetailPageComponent } from './containers/result-detail-page/result-detail-page.component';
import { ResultsPageComponent } from './containers/results-page/results-page.component';
import { AllExamsExistGuard } from './guards/all-exams-exist.guard';
import { ResultExistsGuard } from './guards/result-exists.guard';
import { ResultsGuard } from './guards/results.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, AccountExistsGuard, ResultsGuard],
    component: ResultsPageComponent,
    data: { title: 'Results' },
  },
  {
    path: 'new',
    canActivate: [AuthGuard, AccountExistsGuard, AllExamsExistGuard],
    component: ResultDetailPageComponent,
    data: { title: 'Create Result' },
  },
  {
    path: ':id',
    canActivate: [
      AuthGuard,
      AccountExistsGuard,
      ResultExistsGuard,
      AllExamsExistGuard,
    ],
    component: ResultDetailPageComponent,
    data: { title: 'Update Result' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultsRoutingModule {}
