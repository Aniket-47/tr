import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
interface Food {
  value: string;
  viewValue: string;
}
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
  foods: Food[] = [
    {value: '0', viewValue: 'Permission'},
    {value: '1', viewValue: 'Templates'},
    {value: '2', viewValue: 'Integration'},
    {value: '3', viewValue: 'Configuration'},
    {value: '4', viewValue: 'Billing'},
    {value: '5', viewValue: 'Candidate Portal'},
    {value: '6', viewValue: 'Vendor Portal'},
    {value: '7', viewValue: 'Employee Portal'},
  ];
  selected = '0';
}
