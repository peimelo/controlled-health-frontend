import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormErrorService } from '../../../core/services/form-error.service';

@Component({
  selector: 'app-resend-confirmation-form',
  templateUrl: './resend-confirmation-form.component.html',
  styleUrls: ['./resend-confirmation-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResendConfirmationFormComponent {
  form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
  });

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Output() private submitted = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    public readonly formErrorService: FormErrorService
  ) {}

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.emit(this.form.get('email')?.value);
    }
  }
}
