
import { Component, OnInit } from '@angular/core';
import { ROUTE_CONFIGS } from '../../utility/configs/routerConfig';
import { fadeAnimation } from '../../animations';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss'],
  animations: [fadeAnimation]
})
export class SettingsMenuComponent implements OnInit {
  routerConfig = ROUTE_CONFIGS;

  constructor() { }

  ngOnInit(): void {
  }

}
