import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  cols: number = 1;

  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      if (result.matches) {
        this.cols = 1;
      }
    });
    breakpointObserver.observe([Breakpoints.Tablet]).subscribe((result) => {
      if (result.matches) {
        this.cols = 2;
      }
    });
    breakpointObserver.observe([Breakpoints.Web]).subscribe((result) => {
      if (result.matches) {
        this.cols = 4;
      }
    });
  }
}
