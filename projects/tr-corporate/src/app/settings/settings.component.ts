import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { MFilterComponent } from './permission/m-filter/m-filter.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  showFiller = true;
  drawerMode: any;
  innerWidth: any;

  currentUrlPath: string;

  constructor(private router: Router, private _bottomSheet: MatBottomSheet) {
    this.currentUrlPath = router.url;
    router.events.subscribe(res => {
      this.currentUrlPath = router.url;
    })
  }

  ngOnInit(): void {
    this.drawerMode = 'side';
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 767) {
      this.drawerMode = 'over';
    }
  }
  openBottomSheet(): void {
    this._bottomSheet.open(MFilterComponent);
  }

}
