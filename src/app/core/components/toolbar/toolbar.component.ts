import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { User } from '../../../auth/models';
import {Account} from "../../../accounts/models";

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  @Input() accountSelected!: Account;
  @Input() accountSelectedLoaded!: boolean;
  @Input() loggedIn!: boolean;
  @Input() user!: User;

  @Output() logout = new EventEmitter();
  @Output() openMenu = new EventEmitter();
}
