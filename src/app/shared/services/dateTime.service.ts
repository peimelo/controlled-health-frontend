import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class DateTimeService {
  convertDateToSave(date: any): string {
    return moment(date).format('YYYY-MM-DD');
  }

  convertDateTimeToSave(date: any, time: any): string {
    return moment(`${date} ${time}`).format('YYYY-MM-DD HH:mm');
  }

  convertDateToUtc(date: string): moment.Moment {
    return moment.utc(date);
  }

  convertDateToUtcBr(date: string): string {
    return moment(date).utc().format('DD/MM/YYYY');
  }

  convertTimeToUtc(date: string): string {
    return moment.utc(date).format('HH:mm');
  }

  convertDateTimeToUtc(date: string): string {
    return moment(date).utc().format('DD/MM/YYYY HH:mm');
  }

  dateNow(): moment.Moment {
    return moment();
  }

  timeNow(): string {
    return moment().format('HH:mm');
  }
}
