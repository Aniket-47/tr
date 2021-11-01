import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tr-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger( 'fade', [
      transition ('void => *' , [
        style({opacity: 0 }),
        animate(2000, style({opacity: 1 })),
      ]),
      transition('* => void' , [
        animate(2000, style({opacity:0}))
      ]),
    ]),
  ],
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
