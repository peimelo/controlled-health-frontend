import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  template: `
    <a
      mat-list-item
      [routerLink]="routerLink"
      routerLinkActive="active-list-item"
      [routerLinkActiveOptions]="{ exact: true }"
      (click)="navigate.emit()"
    >
      <mat-icon mat-list-icon *ngIf="!!matIcon">{{ matIcon }}</mat-icon>
      <fa-icon
        [icon]="['fas', fasIcon]"
        mat-list-icon
        *ngIf="!!fasIcon"
      ></fa-icon>
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

      .active-list-item {
        color: #3f51b5 !important; /* Note: You could also use a custom theme */
      }
    `,
  ],
})
export class NavItemComponent {
  @Input() fasIcon = '';
  @Input() hint = '';
  @Input() matIcon = '';
  @Input() routerLink!: string;

  @Output() navigate = new EventEmitter();
}
