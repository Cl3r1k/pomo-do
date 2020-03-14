import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card-description',
  templateUrl: './stat-card-description.component.html',
  styleUrls: ['./stat-card-description.component.scss']
})
export class StatCardDescriptionComponent implements OnInit {

  // *** Inputs ***
  @Input() cardInfo: string;
  @Input() cardData: string;
  @Input() cardDetails: string;
  @Input() isHidden = false;

  constructor() { }

  ngOnInit() {
  }

}
