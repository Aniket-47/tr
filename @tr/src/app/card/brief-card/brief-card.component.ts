import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tr-brief-card',
  templateUrl: './brief-card.component.html',
  styleUrls: ['./brief-card.component.scss']
})
export class BriefCardComponent implements OnInit {
  break: boolean;
  constructor() {
    this.break = false;
  }

  ngOnInit(): void {
  }

}
