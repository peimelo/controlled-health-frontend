import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LayoutFacadeService } from 'src/app/core/services/layout-facade.service';
// import { Pagination } from 'src/app/shared/models';
import { Weight } from '../../models';
import { WeightsFacadeService } from '../../services/weights-facade.service';
// import * as fromWeightsSelectors from '../../selectors';

@Component({
  selector: 'app-weights-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './weights-page.component.html',
})
export class WeightsPageComponent {
  isHandset$ = this.layoutFacadeService.isHandset$;
  pagination$ = this.weightsFacadeService.pagination$;
  weights$ = this.weightsFacadeService.weights$;

  constructor(
    private layoutFacadeService: LayoutFacadeService,
    private weightsFacadeService: WeightsFacadeService
  ) {}

  onChangePage(event: PageEvent) {
    // this.store.dispatch(
    //   WeightsActions.loadWeights({
    //     pageIndex: event.pageIndex + 1,
    //   })
    // );

    this.weightsFacadeService.loadWeights(event.pageIndex + 1);
  }

  onDelete(id: number) {
    // this.store.dispatch(WeightsActions.deleteWeight({ id }));
  }

  onEdit(weight: Weight) {
    // this.store.dispatch(WeightsActions.weightFormDialogOpen({ weight }));
  }

  onWeightFormDialogOpen() {
    // this.store.dispatch(WeightsActions.weightFormDialogOpen({}));
  }
}
