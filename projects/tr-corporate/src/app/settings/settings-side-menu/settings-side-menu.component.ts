import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslatePipe } from '@mucrest/ng-core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { fadeAnimation } from '../../animations';
import { SETTINGS_LN } from '../shared/settings.lang';

@Component({
  selector: 'app-settings-side-menu',
  templateUrl: './settings-side-menu.component.html',
  styleUrls: ['./settings-side-menu.component.scss'],
  animations: [fadeAnimation]
})

export class SettingsSideMenuComponent implements OnInit {

  ln = SETTINGS_LN;
  @Output() navigateEvent = new EventEmitter<any>();

  public config: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
  };

  parents = [
    {
      name: this.ln.TXT_PERMISSIONS,
      link: "./permission",
      activeOption: false,
      child: [
        {
          name: this.ln.TXT_USER_MANAGEMENT,
          link: "./permission/users",
          // link: "routerConfig.SETTINGS_DASHBOARD",
        },
        {
          name: this.ln.TXT_ACCOUNT_ROLE,
          link: "./permission/roles",
        },
      ],
      icon: 'icon-mc mc-grading',
    },
    {
      name: this.ln.TXT_TEMPLATE,
      link: "./",
      activeOption: true,
      child: [
        
      ],
      icon: 'icon-mcf mcf-book',
    },
    {
      name: this.ln.TXT_INTEGRATION,
      link: "./",
      activeOption: true,
      child: [
      ],
      icon: 'icon-mcf mcf-add_task',
    },
    {
      name: this.ln.TXT_CONFIGURATION,
      link: "./",
      activeOption: true,
      child: [
        
      ],
      icon: 'icon-mc mc-settings_brightness',
    },
    {
      name: this.ln.TXT_BILLING,
      link: "./",
      activeOption: true,
      child: [
        
      ],
      icon: 'icon-mc mc-money',
    },
    {
      name: this.ln.TXT_CANDIDATE_PORTAL,
      link: "./",
      activeOption: true,
      child: [
        
      ],
      icon: 'icon-mcf mcf-account_circle',
    },
    {
      name: this.ln.TXT_VENDOR_PORTAL,
      link: "./",
      activeOption: true,
      child: [
        
      ],
      icon: 'icon-mc mc-thumbs_up_down',
    },
    {
      name: this.ln.TXT_EMPLOYEE_PORTAL,
      link: "./",
      activeOption: true,
      child: [
        
      ],
      icon: 'icon-mcf mcf-card_travel',
    },
    {
      name: this.ln.TXT_CAREER_PAGE_BUILDER,
      link: "./",
      activeOption: true,
      child: [
        
      ],
      icon: 'icon-mcf mcf-file_present',
    },
    {
      name: this.ln.TXT_GDPR,
      link: "./",
      activeOption: true,
      child: [
        
      ],
      icon: 'icon-mc mc-corporate_fare',
    }
  ]

  panelOpenState = false;
  autoFocusVal = false;
  constructor() { }

  ngOnInit(): void {
  }

  onNavigate() {
    this.navigateEvent.emit()
  }
}
