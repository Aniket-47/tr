
import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../../animations';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss'],
  animations: [fadeAnimation]
})
export class SettingsMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
