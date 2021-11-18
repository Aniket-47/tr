import { Component, OnInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { fadeAnimation } from '../../animations';

@Component({
  selector: 'app-settings-side-menu',
  templateUrl: './settings-side-menu.component.html',
  styleUrls: ['./settings-side-menu.component.scss'],
  animations: [fadeAnimation]
})

export class SettingsSideMenuComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
  };
  parents = [
    {
      name: 'Permission',
      child: [
        {
          name: 'User Management',
          link: "./permission/users",
        },
        {
          name: 'Account Role',
          link: "./permission/roles",
        },
      ],
      icon: 'icon-mc mc-grading',
    },
    {
      name: 'Templates',
      child: [
        {
          name: 'User Management',
          link: "./permission/users",
        },
        {
          name: 'Account Role',
          link: "./permission/users",
        },
      ],
      icon: 'icon-mcf mcf-book',
    },
    {
      name: 'Integration',
      child: [
        {
          name: 'User Management',
          link: "./permission/users",
        },
        {
          name: 'Account Role',
          link: "./permission/users",
        }
      ],
      icon: 'icon-mcf mcf-add_task',
    },
    {
      name: 'Configuration',
      child: [
        {
          name: 'User Management',
          link: './permission/users',
        },
        {
          name: 'Account Role',
          link: './permission/users',
        }
      ],
      icon: 'icon-mc mc-settings_brightness',
    },
    {
      name: 'Billing',
      child: [
        {
          name: 'User Management',
          link: './permission/users',
        },
        {
          name: 'Account Role',
          link: './permission/users',
        },
      ],
      icon: 'icon-mc mc-money',
    },
    {
      name: 'Candidate Portal',
      child: [
        {
          name: 'User Management',
          link: './permission/users',
        },
        {
          name: 'Account Role',
          link: './permission/users',
        },
      ],
      icon: 'icon-mcf mcf-account_circle',
    },
    {
      name: 'Vendor Portal',
      child: [
        {
          name: 'User Management',
          link: "./permission/users",
        },
        {
          name: 'Account Role',
          link: "./permission/users",
        },
      ],
      icon: 'icon-mc mc-thumbs_up_down',
    },
    {
      name: 'Employee Portal',
      child: [
        {
          name: 'User Management',
          link: "./permission/users",
        },
        {
          name: 'Account Role',
          link: "./permission/users",
        },
      ],
      icon: 'icon-mcf mcf-card_travel',
    },
    {
      name: 'Career Guide',
      child: [
        {
          name: 'User Management',
          link: "./permission/users",
        },
        {
          name: 'Account Role',
          link: "./permission/users",
        },
      ],
      icon: 'icon-mcf mcf-file_present',
    },
    {
      name: 'GDPR',
      child: [
        {
          name: 'User Management',
          link: "./permission/users",
        },
        {
          name: 'Account Role',
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
