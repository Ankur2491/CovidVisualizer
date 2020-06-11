import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() { }
  @Input() mainData;
  @Input() responseData;
  @Input() colorScheme;
  view: any[] = [1200, 370];
  gradient: boolean = false;
  showXAxis = true;
  showYAxis = true;
  states = [];
  districts = [];
  showLegend: boolean = true;
  showXAxisLabel = true;
  xAxisLabel = 'State';
  showYAxisLabel = true;
  yAxisLabel = 'Count';
  ngOnInit() {
  }
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
