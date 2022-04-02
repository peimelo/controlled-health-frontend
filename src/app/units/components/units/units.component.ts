import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { DialogData, Pagination, Unit } from '../../../core/models';
import { ConfirmationDialogService } from '../../../shared/services/confirmation-dialog.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsComponent {
  columnDefinitions = ['name', 'actions'];

  @Input() pagination!: Pagination;
  @Input() sort!: Sort;
  @Input() units!: Unit[];

  @Output() private changePage = new EventEmitter<PageEvent>();
  @Output() private add = new EventEmitter();
  @Output() private delete = new EventEmitter<number>();
  @Output() private edit = new EventEmitter<Unit>();
  @Output() private sortEvent = new EventEmitter<Sort>();

  constructor(private confirmationDialogService: ConfirmationDialogService) {}

  deleteConfirmDialog(unit: Unit): void {
    const dialogData: DialogData = {
      confirmText: 'Remove',
      content: `'${unit.name}' will be removed.`,
      title: 'Remove unit',
    };
    this.confirmationDialogService.show(this.delete, unit.id, dialogData);
  }

  onAdd(): void {
    this.add.emit();
  }

  onChangePage(event: PageEvent): void {
    this.changePage.emit(event);
  }

  onEdit(unit: Unit): void {
    this.edit.emit(unit);
  }

  sortData(sort: Sort) {
    this.sortEvent.emit(sort);
  }
}
