import { Component, Input } from '@angular/core';
import * as shape from 'd3-shape';
import { Dashboard } from '../../models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  view: any[];
  schemeType = 'ordinal';
  animations = true;
  showLegend = false;
  legendTitle = 'Legend';
  legendPosition = 'right';
  gradient = false;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Date';
  yAxisLabel = 'Weight';
  autoScale = true;
  xScaleMin: any;
  xScaleMax: any;
  yScaleMin: number;
  yScaleMax: number;
  timeline = true;
  showGridLines = true;

  curves = {
    Basis: shape.curveBasis,
    'Basis Closed': shape.curveBasisClosed,
    Bundle: shape.curveBundle.beta(1),
    Cardinal: shape.curveCardinal,
    'Cardinal Closed': shape.curveCardinalClosed,
    'Catmull Rom': shape.curveCatmullRom,
    'Catmull Rom Closed': shape.curveCatmullRomClosed,
    Linear: shape.curveLinear,
    'Linear Closed': shape.curveLinearClosed,
    'Monotone X': shape.curveMonotoneX,
    'Monotone Y': shape.curveMonotoneY,
    Natural: shape.curveNatural,
    Step: shape.curveStep,
    'Step After': shape.curveStepAfter,
    'Step Before': shape.curveStepBefore,
    default: shape.curveLinear,
  };

  // line interpolation
  curveType = 'Linear';
  curve: any = this.curves[this.curveType];
  rangeFillOpacity = 0.15;
  roundDomains = false;
  tooltipDisabled = false;
  trimXAxisTicks = true;
  trimYAxisTicks = true;
  maxXAxisTickLength = 16;
  maxYAxisTickLength = 16;

  @Input() dashboard: Dashboard;

  get dateDataWithOrWithoutRange() {
    if (!this.dashboard) {
      return [];
    }

    const series = [];
    for (let i = this.dashboard.weights.length - 1; i >= 0; i--) {
      series.push({
        value: this.dashboard.weights[i].value,
        name: new Date(this.dashboard.weights[i].date),
        min: 59.91,
        max: 80.97,
      });
    }

    return [
      {
        name: 'Weights',
        series,
      },
    ];
  }
}
