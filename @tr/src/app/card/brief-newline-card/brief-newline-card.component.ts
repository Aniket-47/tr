import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tr-brief-newline-card',
  templateUrl: './brief-newline-card.component.html',
  styleUrls: ['./brief-newline-card.component.scss']
})
export class BriefNewlineCardComponent implements OnInit {

  break = true;

  constructor() { }

  ngOnInit(): void {
  }

}
