import { ConfirmationDialogService } from './confirmation-dialog.service';
import { DateTimeService } from './dateTime.service';
import { ErrorsService } from './errors.service';
import { NumberService } from './number.service';

export const services: any[] = [
  ConfirmationDialogService,
  DateTimeService,
  ErrorsService,
  NumberService,
];

export * from './confirmation-dialog.service';
export * from './dateTime.service';
export * from './errors.service';
export * from './number.service';
