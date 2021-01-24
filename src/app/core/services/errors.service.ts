import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class ErrorsService {
  getMessage(error: any): string {
    if (!environment.production) {
      console.log(error);
    }

    let message = error && error.message;

    if (error && error.error && error.error.errors) {
      if (error.error.errors.full_messages) {
        message = error.error.errors.full_messages[0];
      } else {
        message = error.error.errors[0];
      }
    } else if (error.status === 404) {
      return error.statusText;
    }

    return message;
  }
}
