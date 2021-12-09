import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboard } from '../../models';
import { DashboardFacadeService } from '../../services/dashboard-facade.service';

@Component({
  selector: 'app-dashboard-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard-page.component.html',
})
export class DashboardPageComponent {
  dashboard$: Observable<Dashboard>;

  constructor(private dashboardFacadeService: DashboardFacadeService) {
    this.dashboard$ = this.dashboardFacadeService.dashboard$;
  }
}
