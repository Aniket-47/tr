import { Component, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {
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

}
