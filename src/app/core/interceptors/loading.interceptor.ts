import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IsLoadingService } from '@service-work/is-loading';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerFacadeService } from '../services/spinner-facade.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  activeRequests = 0;

  constructor(
    private loadingService: IsLoadingService,
    private spinnerFacade: SpinnerFacadeService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.activeRequests === 0) {
      this.spinnerFacade.show();
      this.loadingService.add({ key: 'loading' });
    }

    this.activeRequests++;

    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequests--;

        if (this.activeRequests === 0) {
          this.spinnerFacade.hide();
          this.loadingService.remove({ key: 'loading' });
        }
      })
    );
  }
}
