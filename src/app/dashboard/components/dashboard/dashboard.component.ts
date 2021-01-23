import { Component, Input } from '@angular/core';
import { Height, Weight } from '../../../shared/models';
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

  xAxis = true;
  xAxisLabel = 'Date';
  showXAxisLabel = true;

  yAxis = true;
  showYAxisLabel = true;

  @Input() title = '';
  @Input() dashboard!: Dashboard;
  @Input() data!: Height[] | Weight[];

  get result() {
    if (!this.data) {
      return [];
    }

    const series = [];
    for (let i = this.data.length - 1; i >= 0; i--) {
      series.push({
        value: this.data[i].value,
        name: new Date(this.data[i].date),
        min: this.data[i].min ? this.data[i].min : 0,
        max: this.data[i].max ? this.data[i].max : 0,
      });
    }

    if (!series[0].min) {
      series.forEach(function (v) {
        delete v.min;
        delete v.max;
      });
    }

    return [
      {
        name: this.title,
        series,
      },
    ];
  }
}
