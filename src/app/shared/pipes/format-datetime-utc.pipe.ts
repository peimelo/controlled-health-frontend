import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatDatetimeUtc'
})
export class FormatDatetimeUtcPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return moment.utc(value).format(args);
  }

}
