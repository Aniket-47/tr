import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
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

  public config: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
  };

  parents = [
    {
      name: this.ln.TXT_PERMISSIONS,
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
      child: [
        {
          name: this.ln.TXT_USER_MANAGEMENT,
          link: "./permission/users",
        },
        {
          name: this.ln.TXT_ACCOUNT_ROLE,
          link: "./permission/users",
        },
      ],
      icon: 'icon-mcf mcf-book',
    },
    {
      name: this.ln.TXT_INTEGRATION,
      child: [
        {
          name: this.ln.TXT_USER_MANAGEMENT,
          link: "./permission/users",
        },
        {
          name: this.ln.TXT_ACCOUNT_ROLE,
          link: "./permission/users",
        }
      ],
      icon: 'icon-mcf mcf-add_task',
    },
    {
      name: this.ln.TXT_CONFIGURATION,
      child: [
        {
          name: this.ln.TXT_USER_MANAGEMENT,
          link: './permission/users',
        },
        {
          name: this.ln.TXT_ACCOUNT_ROLE,
          link: './permission/users',
        }
      ],
      icon: 'icon-mc mc-settings_brightness',
    },
    {
      name: this.ln.TXT_BILLING,
      child: [
        {
          name: this.ln.TXT_USER_MANAGEMENT,
          link: './permission/users',
        },
        {
          name: this.ln.TXT_ACCOUNT_ROLE,
          link: './permission/users',
        },
      ],
      icon: 'icon-mc mc-money',
    },
    {
      name: this.ln.TXT_CANDIDATE_PORTAL,
      child: [
        {
          name: this.ln.TXT_USER_MANAGEMENT,
          link: './permission/users',
        },
        {
          name: this.ln.TXT_ACCOUNT_ROLE,
          link: './permission/users',
        },
      ],
      icon: 'icon-mcf mcf-account_circle',
    },
    {
      name: this.ln.TXT_VENDOR_PORTAL,
      child: [
        {
          name: this.ln.TXT_USER_MANAGEMENT,
          link: "./permission/users",
        },
        {
          name: this.ln.TXT_ACCOUNT_ROLE,
          link: "./permission/users",
        },
      ],
      icon: 'icon-mc mc-thumbs_up_down',
    },
    {
      name: this.ln.TXT_EMPLOYEE_PORTAL,
      child: [
        {
          name: this.ln.TXT_USER_MANAGEMENT,
          link: "./permission/users",
        },
        {
          name: this.ln.TXT_ACCOUNT_ROLE,
          link: "./permission/users",
        },
      ],
      icon: 'icon-mcf mcf-card_travel',
    },
    {
      name: this.ln.TXT_CAREER_PAGE_BUILDER,
      child: [
        {
          name: this.ln.TXT_USER_MANAGEMENT,
          link: "./permission/users",
        },
        {
          name: this.ln.TXT_ACCOUNT_ROLE,
          link: "./permission/users",
        },
      ],
      icon: 'icon-mcf mcf-file_present',
    },
    {
      name: this.ln.TXT_GDPR,
      child: [
        {
          name: this.ln.TXT_USER_MANAGEMENT,
          link: "./permission/users",
        },
        {
          name: this.ln.TXT_ACCOUNT_ROLE,
          link: "./permission/users",
        },
      ],
      icon: 'icon-mc mc-corporate_fare',
    },
    {
      name: this.ln.TXT_GDPR,
      child: [
        {
          name: this.ln.TXT_USER_MANAGEMENT,
          link: "./permission/users",
        },
        {
          name: this.ln.TXT_ACCOUNT_ROLE,
          link: "./permission/users",
        },
      ],
      icon: 'icon-mc mc-corporate_fare',
    },
    {
      name: this.ln.TXT_GDPR,
      child: [
        {
          name: this.ln.TXT_USER_MANAGEMENT,
          link: "./permission/users",
        },
        {
          name: this.ln.TXT_ACCOUNT_ROLE,
          link: "./permission/users",
        },
      ],
      icon: 'icon-mc mc-corporate_fare',
    },
    {
      name: this.ln.TXT_GDPR,
      child: [
        {
          name: this.ln.TXT_USER_MANAGEMENT,
          link: "./permission/users",
        },
        {
          name: this.ln.TXT_ACCOUNT_ROLE,
          link: "./permission/users",
        },
      ],
      icon: 'icon-mc mc-corporate_fare',
    },
    {
      name: this.ln.TXT_GDPR,
      child: [
        {
          name: this.ln.TXT_USER_MANAGEMENT,
          link: "./permission/users",
        },
        {
          name: this.ln.TXT_ACCOUNT_ROLE,
          link: "./permission/users",
        },
      ],
      icon: 'icon-mc mc-corporate_fare',
    },
    {
      name: this.ln.TXT_GDPR,
      child: [
        {
          name: this.ln.TXT_USER_MANAGEMENT,
          link: "./permission/users",
        },
        {
          name: this.ln.TXT_ACCOUNT_ROLE,
          link: "./permission/users",
        },
      ],
      icon: 'icon-mc mc-corporate_fare',
    }
  ]

  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }
}
