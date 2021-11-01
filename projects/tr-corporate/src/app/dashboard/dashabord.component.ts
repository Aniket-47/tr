import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashabord',
  templateUrl: './dashabord.component.html',
  styleUrls: ['./dashabord.component.scss']
})
export class DashabordComponent implements OnInit {

  hidden = false;
  colorActivation = false;
  msgColorActivation = false;
  searchToggle = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  constructor() { }

  ngOnInit(): void { }

  toggleSearch() {
    this.searchToggle = !this.searchToggle;
  }
}
