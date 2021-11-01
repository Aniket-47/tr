import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../animations';

@Component({
  selector: 'app-dashabord',
  templateUrl: './dashabord.component.html',
  styleUrls: ['./dashabord.component.scss'],
  animations: [fadeAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class DashabordComponent implements OnInit {

  date: any;
  hidden = false;
  colorActivation = false;
  msgColorActivation = false;
  searchToggle = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  constructor() { }

  ngOnInit(): void {
    this.date = new Date()
  }

  toggleSearch() {
    this.searchToggle = !this.searchToggle;
  }
}
