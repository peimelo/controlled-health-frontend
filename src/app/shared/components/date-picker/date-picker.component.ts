import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-date-picker',
  templateUrl: 'date-picker.component.html',
})
export class DatePickerComponent {
  @Input() controlName = 'date';
  @Input() form!: FormGroup;
  @Input() label = 'Date';
  @Input() required = true;

  getErrorDate(pickerInput: string): string {
    if (this.required && (!pickerInput || pickerInput === '')) {
      return 'Please choose a date.';
    }

    return this.isMyDateFormat(pickerInput);
  }

  private isMyDateFormat(date: string): string {
    const da = date.split('/');

    if (
      da.length !== 3 ||
      da[0].length !== 2 ||
      da[1].length !== 2 ||
      da[2].length !== 4
    ) {
      return 'Please input a valid format.';
    } else if (!moment(date, 'DD/MM/YYYY').isValid()) {
      return 'Please input a valid date.';
    }

    return 'Unknown error.';
  }
}
