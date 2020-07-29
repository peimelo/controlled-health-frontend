import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-sidenav-container class="sidenav-container">
      <ng-content></ng-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .sidenav-container {
        height: 100%;
      }

      /* ngrx */
      mat-sidenav-container {
        background: rgba(0, 0, 0, 0.03);
      }
      *,
      /deep/ * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    `,
  ],
})
export class LayoutComponent {}
