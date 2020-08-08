import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-nav-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a mat-list-item [routerLink]="routerLink" (click)="navigate.emit()">
      <fa-icon [icon]="['fas', icon]" mat-list-icon></fa-icon>
      <span mat-line><ng-content></ng-content></span>
      <span mat-line class="secondary">{{ hint }}</span>
    </a>
  `,
  styles: [
    `
      /* ngrx */
      .secondary {
        color: rgba(0, 0, 0, 0.54);
      }
    `,
  ],
})
export class NavItemComponent {
  @Input() hint = '';
  @Input() icon = '';
  @Input() routerLink: string | any[] = '/';
  @Output() navigate = new EventEmitter();
}
