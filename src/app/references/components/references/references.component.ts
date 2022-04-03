import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { DialogData, Pagination, Reference } from '../../../core/models';
import { ConfirmationDialogService } from '../../../shared/services/confirmation-dialog.service';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferencesComponent {
  columnDefinitions = ['name', 'actions'];

  @Input() pagination!: Pagination;
  @Input() sort!: Sort;
  @Input() references!: Reference[];

  @Output() private changePage = new EventEmitter<PageEvent>();
  @Output() private add = new EventEmitter();
  @Output() private delete = new EventEmitter<number>();
  @Output() private edit = new EventEmitter<Reference>();
  @Output() private sortEvent = new EventEmitter<Sort>();

  constructor(private confirmationDialogService: ConfirmationDialogService) {}

  deleteConfirmDialog(reference: Reference): void {
    const dialogData: DialogData = {
      confirmText: 'Remove',
      content: `'${reference.name}' will be removed.`,
      title: 'Remove reference',
    };
    this.confirmationDialogService.show(this.delete, reference.id, dialogData);
  }

  onAdd(): void {
    this.add.emit();
  }

  onChangePage(event: PageEvent): void {
    this.changePage.emit(event);
  }

  onEdit(reference: Reference): void {
    this.edit.emit(reference);
  }

  sortData(sort: Sort) {
    this.sortEvent.emit(sort);
  }
}
