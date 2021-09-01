import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LayoutFacadeService } from '../../../shared/services';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  mediaObserver$ = this.layoutFacadeService.mediaObserver$;

  constructor(private layoutFacadeService: LayoutFacadeService) {}
}
