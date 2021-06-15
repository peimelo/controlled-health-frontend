import { Injectable } from '@angular/core';
import { IsLoadingService } from '@service-work/is-loading';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpinnerFacadeService {
  isLoading$: Observable<boolean>;
  private key = 'loading';

  constructor(private isLoadingService: IsLoadingService) {
    this.isLoading$ = this.isLoadingService.isLoading$({ key: this.key });
  }

  hide(): void {
    this.isLoadingService.remove({ key: this.key });
  }

  show(): void {
    this.isLoadingService.add({ key: this.key });
  }
}
