import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DateTimeService } from '../../../shared/services/dateTime.service';
import { ChartResult, Serie } from '../../models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnChanges {
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  average = 0;
  maximumDate = '';
  maximumValue = 0;
  minimumDate = '';
  minimumValue = 0;

  results: ChartResult[] = [];

  @Input() data!: any[];
  @Input() showAverage = true;
  @Input() showTime = false;
  @Input() title = '';

  constructor(private dateTimeService: DateTimeService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data.currentValue) {
      this.results = this.getChartData();
    }
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

  private getChartData(): ChartResult[] {
    if (!this.data) {
      return [];
    }

    const series: Serie[] = [];
    let max = 0;
    let min = 0;
    this.resetValues();

    for (let i = this.data.length - 1; i >= 0; i--) {
      if (this.data[i].hasOwnProperty('range')) {
        max = this.data[i].range.max;
        min = this.data[i].range.min;
      } else {
        max = -1;
        min = -1;
      }

      this.setMaximumDateAndValue(this.data[i].date, this.data[i].value);
      this.setMinimumDateAndValue(this.data[i].date, this.data[i].value);

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

  private resetValues(): void {
    this.average = 0;
    this.maximumDate = '';
    this.maximumValue = 0;
    this.minimumDate = '';
    this.minimumValue = 0;
  }

  private setMaximumDateAndValue(date: string, value: number): void {
    if (value >= this.maximumValue || !this.maximumValue) {
      this.maximumValue = value;
      this.maximumDate = this.getDateTime(date);
    }
  }

  private setMinimumDateAndValue(date: string, value: number): void {
    if (value <= this.minimumValue || !this.minimumValue) {
      this.minimumValue = value;
      this.minimumDate = this.getDateTime(date);
    }
  }
}
