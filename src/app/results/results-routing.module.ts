import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ResultDetailPageComponent } from './containers/result-detail-page/result-detail-page.component';
import { ResultsPageComponent } from './containers/results-page/results-page.component';
import { AllExamsExistsGuard } from './guards/all-exams-exists.guard';
import { ResultExistsGuard } from './guards/result-exists.guard';
import { ResultsGuard } from './guards/results.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, ResultsGuard],
    component: ResultsPageComponent,
    data: { title: 'Results' },
  },
  {
    path: 'new',
    canActivate: [AuthGuard, AllExamsExistsGuard],
    component: ResultDetailPageComponent,
    data: { title: 'Create Result' },
  },
  {
    path: ':id',
    canActivate: [AuthGuard, ResultExistsGuard, AllExamsExistsGuard],
    component: ResultDetailPageComponent,
    data: { title: 'Update Result' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultsRoutingModule {}
