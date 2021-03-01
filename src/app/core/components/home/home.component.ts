import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnChanges {
  cols = 2;

  @Input() mediaObserver!: MediaChange[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.mediaObserver && changes.mediaObserver.currentValue) {
      const mqAlias = changes.mediaObserver.currentValue[0].mqAlias;

      if (mqAlias === 'xs') {
        this.cols = 1;
      } else if (mqAlias === 'sm' || mqAlias === 'md') {
        this.cols = 2;
      } else {
        this.cols = 4;
      }
    }
  }
}
