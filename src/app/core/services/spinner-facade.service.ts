import { Injectable } from '@angular/core';
import { IsLoadingService } from '@service-work/is-loading';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpinnerFacadeService {
  private key = 'loading';
  showSpinner$: Observable<boolean>;

  constructor(private isLoadingService: IsLoadingService) {
    this.showSpinner$ = this.isLoadingService.isLoading$({ key: this.key });
  }

  hide(): void {
    this.isLoadingService.remove({ key: this.key });
  }

  show(): void {
    this.isLoadingService.add({ key: this.key });
  }
}
