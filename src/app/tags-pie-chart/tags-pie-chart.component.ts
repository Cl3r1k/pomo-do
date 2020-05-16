import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tags-pie-chart',
  templateUrl: './tags-pie-chart.component.html',
  styleUrls: ['./tags-pie-chart.component.scss'],
})
export class TagsPieChartComponent implements OnInit {
  // *** Inputs ***
  @Input() hashtagsChartValues: Object[];

  // *** Output emitters ***
  @Output() selectedHashtagTagsPieChartComponentEmitter: EventEmitter<
    string
  > = new EventEmitter();

  selected = -1;

  constructor() {}

  ngOnInit() {}

  toggleSelectedChartPart(selectedIndex: number) {
    console.log(
      '<TagsPieChartComponent> toggleSelectedChartPart() hashtagsChartValues: ',
      this.hashtagsChartValues
    );
    // (mouseover)="selected = i" (mouseout)="selected = -1"
    this.selected = selectedIndex !== this.selected ? selectedIndex : -1;
    const selectedHashtag =
      this.selected >= 0
        ? this.hashtagsChartValues[this.selected]['tagName']
        : '';
    this.selectedHashtagTagsPieChartComponentEmitter.emit(selectedHashtag);
  }
}
