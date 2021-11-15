import { Component, OnInit } from '@angular/core';
import { ROUTE_CONFIGS } from '../../utility/configs/routerConfig';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss']
})
export class SettingsMenuComponent implements OnInit {
  routerConfig = ROUTE_CONFIGS;

  constructor() { }

  ngOnInit(): void {
  }

}
