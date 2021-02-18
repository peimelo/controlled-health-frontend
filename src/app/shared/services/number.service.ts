import { Injectable } from '@angular/core';

@Injectable()
export class NumberService {
  convertToFloat(oldValue: any, newValue: any): number {
    return parseFloat(oldValue) ===
      parseFloat(newValue.replace('.', '').replace(',', '.'))
      ? oldValue
      : newValue;
  }
}
