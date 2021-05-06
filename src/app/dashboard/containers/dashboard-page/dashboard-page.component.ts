import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DashboardFacadeService } from '../../services/dashboard-facade.service';

@Component({
  selector: 'app-dashboard-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard-page.component.html',
})
export class DashboardPageComponent implements OnInit {
  dashboard$ = this.dashboardFacadeService.dashboard$;

  constructor(private dashboardFacadeService: DashboardFacadeService) {}

  ngOnInit(): void {
    this.dashboardFacadeService.loadDashboard();
  }
}
