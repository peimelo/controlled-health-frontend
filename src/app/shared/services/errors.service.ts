import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MessageApiActions } from '../../core/actions';

@Injectable({ providedIn: 'root' })
export class ErrorsService {
  private getMessage(err: any): string {
    if (!environment.production) {
      console.log(err);
    }

    let message = err.message;

    if (err.error) {
      if (Array.isArray(err.error) && err.error.length) {
        return err.error[0];
      }

      if (err.error.errors) {
        if (Array.isArray(err.error.errors) && err.error.errors.length) {
          return err.error.errors[0];
        }
      }
    } else if (err.status === 404) {
      return err.statusText;
    }

    return message;
  }

  showError(error: any): Observable<any> {
    const message = this.getMessage(error);
    return of(MessageApiActions.errorMessage({ message }));
  }
}
