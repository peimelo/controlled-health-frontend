import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../auth/models';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }
    `,
  ],
})
export class ToolbarComponent {
  @Input() loggedIn!: boolean;
  @Input() user!: User;

  @Output() logout = new EventEmitter();
  @Output() openMenu = new EventEmitter();
}
