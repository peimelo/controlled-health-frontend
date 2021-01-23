import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { LayoutFacadeService } from '../../../core/services/layout-facade.service';
import { Height } from '../../../shared/models';
import { HeightsFacadeService } from '../../services/heights-facade.service';

@Component({
  selector: 'app-heights-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './heights-page.component.html',
})
export class HeightsPageComponent {
  isHandset$ = this.layoutFacadeService.isHandset$;
  pagination$ = this.heightsFacadeService.pagination$;
  heights$: Observable<Height[]>;

  constructor(
    private layoutFacadeService: LayoutFacadeService,
    private heightsFacadeService: HeightsFacadeService
  ) {
    this.heights$ = this.heightsFacadeService.heights$;
  }

  onAdd(): void {
    this.heightsFacadeService.addHeight();
  }

  onChangePage(event: PageEvent): void {
    this.heightsFacadeService.changePageHeights(event.pageIndex + 1);
  }

  onDelete(id: number): void {
    this.heightsFacadeService.deleteHeight(id);
  }

  onEdit(height: Height): void {
    this.heightsFacadeService.editHeight(height);
  }
}
