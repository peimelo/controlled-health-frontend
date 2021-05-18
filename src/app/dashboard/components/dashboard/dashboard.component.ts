import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Dashboard } from '../../models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  @Input() dashboard?: Dashboard;
}
