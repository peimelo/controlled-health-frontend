import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MessageApiActions } from '../../core/actions';

@Injectable({ providedIn: 'root' })
export class ErrorsService {
  private getMessage(error: any): string {
    if (!environment.production) {
      console.log(error);
    }

    let message = error.message;

    if (error.error && error.error.errors) {
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

  showError(error: any): Observable<any> {
    const message = this.getMessage(error);
    return of(MessageApiActions.errorMessage({ message }));
  }
}
