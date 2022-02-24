import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NumberService {
  convertToFloat(value: string): number {
    return parseFloat(value.replace('.', '').replace(',', '.'));
  }
}
