import { Component, OnInit } from '@angular/core';
import { ROUTE_CONFIGS } from '../../utility/configs/routerConfig';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  SETTINS_ROUTE: string = ROUTE_CONFIGS.SETTINGS_DASHBOARD;

  constructor() { }

  ngOnInit(): void {
  }

}
