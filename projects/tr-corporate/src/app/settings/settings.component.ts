import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  showFiller = true;
  drawerMode: any;
  innerWidth: any;
  constructor() { }

  ngOnInit(): void {
    this.drawerMode = 'side';
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 767) {
      this.drawerMode = 'over';
    }
  }
}
