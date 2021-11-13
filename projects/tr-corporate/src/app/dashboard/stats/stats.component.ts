import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ROUTE_CONFIGS } from '../../utility/configs/routerConfig';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]
})
export class StatsComponent implements OnInit {

  SETTINS_ROUTE: string = ROUTE_CONFIGS.SETTINGS_DASHBOARD;

  constructor() { }

  ngOnInit(): void {
  }

}
