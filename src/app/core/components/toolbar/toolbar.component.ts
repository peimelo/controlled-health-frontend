import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { User } from '../../../auth/models';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() isHandset: boolean;
  @Input() isSpinnerLoading: boolean;
  @Input() loggedIn: boolean;
  @Input() user: any;

  @Output() logout = new EventEmitter();
  @Output() openMenu = new EventEmitter();
}
