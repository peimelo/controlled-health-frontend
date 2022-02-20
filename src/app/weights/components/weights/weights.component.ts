import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { DialogData, Pagination, Weight } from '../../../core/models';
import { ConfirmationDialogService } from '../../../shared/services/confirmation-dialog.service';
import { DateTimeService } from '../../../shared/services/dateTime.service';

@Component({
  selector: 'app-weights',
  templateUrl: './weights.component.html',
  styleUrls: ['./weights.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeightsComponent {
  private columnDefinitions = [
    { columnDef: 'date', showPortrait: true },
    { columnDef: 'value', showPortrait: true },
    { columnDef: 'range', showPortrait: false },
    { columnDef: 'actions', showPortrait: true },
  ];

  @Input() isHandsetPortrait!: boolean;
  @Input() pagination!: Pagination;
  @Input() sort!: Sort;
  @Input() weights!: Weight[];

  @Output() private changePage = new EventEmitter<PageEvent>();
  @Output() private add = new EventEmitter();
  @Output() private delete = new EventEmitter<number>();
  @Output() private edit = new EventEmitter<Weight>();
  @Output() private sortEvent = new EventEmitter<Sort>();

  constructor(
    private confirmationDialogService: ConfirmationDialogService,
    private dateTimeService: DateTimeService
  ) {}

  deleteConfirmDialog(weight: Weight): void {
    const dialogData: DialogData = {
      confirmText: 'Remove',
      content: `'${this.dateTimeService.convertDateTimeToUtc(
        weight.date
      )}' will be removed.`,
      title: 'Remove weight',
    };
    this.confirmationDialogService.show(this.delete, weight.id, dialogData);
  }

  getDisplayedColumns(): string[] {
    return this.columnDefinitions
      .filter((item) => (this.isHandsetPortrait ? item.showPortrait : true))
      .map((item) => item.columnDef);
  }

  onAdd(): void {
    this.add.emit();
  }

  onChangePage(event: PageEvent): void {
    this.changePage.emit(event);
  }

  onEdit(weight: Weight): void {
    this.edit.emit(weight);
  }

  sortData(sort: Sort) {
    this.sortEvent.emit(sort);
  }
}
