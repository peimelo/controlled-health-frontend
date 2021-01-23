import { Component, Input } from '@angular/core';
import { Dashboard } from '../../models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  autoScale = true;
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };
  timeline = true;

  xAxis = true;
  xAxisLabel = 'Date';
  showXAxisLabel = true;

  yAxis = true;
  yAxisLabel = 'Weight';
  showYAxisLabel = true;

  @Input() dashboard!: Dashboard;

  get result() {
    if (!this.dashboard) {
      return [];
    }

    const series = [];
    for (let i = this.dashboard.weights.length - 1; i >= 0; i--) {
      series.push({
        value: this.dashboard.weights[i].value,
        name: new Date(this.dashboard.weights[i].date),
        min: this.dashboard.weights[i].min,
        max: this.dashboard.weights[i].max,
      });
    }

    return [
      {
        name: 'Weights',
        series,
      },
    ];
  }
}
