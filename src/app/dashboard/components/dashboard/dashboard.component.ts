import { Component, Input } from '@angular/core';

interface Serie {
  name: Date;
  value: number;
  min?: number;
  max?: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  @Input() title = '';
  @Input() data!: any;

  get result() {
    if (!this.data) {
      return [];
    }

    const series: Serie[] = [];
    let min = 0;
    let max = 0;

    for (let i = this.data.length - 1; i >= 0; i--) {
      if (this.data[i].hasOwnProperty('range')) {
        min = this.data[i].range.min;
        max = this.data[i].range.max;
      } else {
        min = -1;
        max = -1;
      }

      series.push({
        value: this.data[i].value,
        name: new Date(this.data[i].date),
        min,
        max,
      });
    }

    if (!!series.length && series[0].min === -1) {
      series.forEach((serie) => {
        delete serie.min;
        delete serie.max;
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
