import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['../account-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteAccountComponent {
  @Output() private delete = new EventEmitter();

  onDelete(): void {
    this.delete.emit();
  }
}
