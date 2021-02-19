import { Component, Input } from '@angular/core';
import { DateTimeService } from '../../../shared/services/dateTime.service';

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

  minimum!: number;
  minimumDate = '';
  maximum!: number;
  maximumDate = '';
  average = 0;

  @Input() title = '';
  @Input() data!: any[];
  @Input() showAverage = true;
  @Input() showTime = false;

  constructor(private dateTimeService: DateTimeService) {}

  get result() {
    if (!this.data) {
      return [];
    }

    const series: Serie[] = [];
    let min = 0;
    let max = 0;
    this.average = 0;

    for (let i = this.data.length - 1; i >= 0; i--) {
      if (this.data[i].hasOwnProperty('range')) {
        min = this.data[i].range.min;
        max = this.data[i].range.max;
      } else {
        min = -1;
        max = -1;
      }

      if (this.data[i].value <= this.minimum || !this.minimum) {
        this.minimum = this.data[i].value;
        this.minimumDate = this.getDateTime(this.data[i].date);
      }

      if (this.data[i].value >= this.maximum || !this.maximum) {
        this.maximum = this.data[i].value;
        this.maximumDate = this.getDateTime(this.data[i].date);
      }

      this.average += parseFloat(this.data[i].value);

      series.push({
        value: this.data[i].value,
        name: new Date(this.data[i].date),
        min,
        max,
      });
    }

    this.average = Math.round((this.average / this.data.length) * 100) / 100;

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

  getDateTime(date: string): string {
    if (this.showTime) {
      return this.dateTimeService.convertDateTimeToUtc(date);
    } else {
      return this.dateTimeService.convertDateToUtcBr(date);
    }
  }

  getValue(model: Serie): string {
    const { value, min, max } = model;

    if (min && max) {
      return `${value} (min: ${min} ~ max: ${max})`;
    }

    return value.toString();
  }
}
