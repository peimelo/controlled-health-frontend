import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultsFacadeService } from '../../services/results-facade.service';

@Component({
  selector: 'app-result-detail-page',
  templateUrl: './result-detail-page.component.html',
  styleUrls: ['./result-detail-page.component.scss'],
})
export class ResultDetailPageComponent {
  result$ = this.resultsFacadeService.selected$;

  constructor(
    private resultsFacadeService: ResultsFacadeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getResult();
  }

  getResult(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.resultsFacadeService.loadResult(+id);
      }
    });
  }
}
