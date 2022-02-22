import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboard } from '../../models';
import { DashboardFacadeService } from '../../services/dashboard-facade.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
  dashboard$: Observable<Dashboard>;

  constructor(private dashboardFacadeService: DashboardFacadeService) {
    this.dashboard$ = this.dashboardFacadeService.dashboard$;
  }
}
