import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LayoutFacadeService } from '../../services/layout-facade.service';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  cols: number = 1;

  constructor(private layoutFacadeService: LayoutFacadeService) {
    this.layoutFacadeService.isHandset$.subscribe((result) => {
      if (result) {
        this.cols = 1;
      }
    });

    this.layoutFacadeService.isTablet$.subscribe((result) => {
      if (result) {
        this.cols = 2;
      }
    });

    this.layoutFacadeService.isWeb$.subscribe((result) => {
      if (result) {
        this.cols = 4;
      }
    });
  }
}
