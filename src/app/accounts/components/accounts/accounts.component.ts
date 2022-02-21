import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Account } from '../../models';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsComponent {
  @Input() isLoading!: boolean;
  @Input() accounts!: Account[];
  @Input() accountSelected!: Account | null;
  @Input() accountSelectedLoaded!: boolean;

  @Output() private add = new EventEmitter();
  @Output() private delete = new EventEmitter<string>();
  @Output() private edit = new EventEmitter<Account>();
  @Output() private enter = new EventEmitter<Account>();

  onAdd(): void {
    this.add.emit();
  }

  onDelete(id: string): void {
    this.delete.emit(id);
  }

  onEdit(account: Account): void {
    this.edit.emit(account);
  }

  onEnter(account: Account): void {
    this.enter.emit(account);
  }
}
