// import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
// import { MatTreeNestedDataSource } from '@angular/material/tree';

// interface FoodNode {
//   name: string;
//   route?: string;
//   children?: FoodNode[];
//   icon?: string;
// }

@Component({
  selector: 'app-settings-side-menu',
  templateUrl: './settings-side-menu.component.html',
  styleUrls: ['./settings-side-menu.component.scss']
})
export class SettingsSideMenuComponent implements OnInit {

  parents = [
    {
      name: 'Permission',
      child : [
        {
          name: 'User Management',
          link: "/dashboard/settings/permission/users",
        },
        {
          name: 'Account Role',
          link: "/dashboard/settings/permission/users",
        },
      ],
      icon: 'mc-grading',
    },
    {
      name: 'Templates',
      child : [
        {
          name: 'Pepper',
          link: "/dashboard/settings/permission/users",
        },
        {
          name: 'Salt',
          link: "/dashboard/settings/permission/users",
        },
      ],
      icon: 'mcf-add_task',
    },
    {
      name: 'Integration',
      children: [
        {
          name: 'User Management',
          link: "/dashboard/settings/permission/users",
        },
        {
          name: 'Account Role',
          link: "/dashboard/settings/permission/users",
        }
      ],
      icon: 'mcf-book',
    },
    {
      name: 'Configuration',
      children: [
        {
          name: 'User Management',
          link: '/dashboard/settings/permission/users',
        },
        {
          name: 'Account Role',
          link: '/dashboard/settings/permission/users',
        }
      ],
      icon: 'mc-settings_brightness',
    },
    {
      name: 'Billing',
      children: [
        {
          name: 'User Management',
          link: '/dashboard/settings/permission/users',
        },
        {            
          name: 'Account Role',
          link: '/dashboard/settings/permission/users',
        },
      ],
      icon: 'mc-money',
    }, 
    {
      name: 'Candidate Portal',
      children: [
        {
          name: 'User Management',
          link: '/dashboard/settings/permission/users',
        },
        {
          name: 'Account Role',
          link: '/dashboard/settings/permission/users',
        },
      ],
      icon: 'mcf-account_circle',
    },
    {
      name: 'Vendor Portal',
      children: [
        {
          name: 'User Management',
          link: "/dashboard/settings/permission/users",
        },
        {
          name: 'Account Role',
          link: "/dashboard/settings/permission/users",
        },
      ],
      icon: 'mc-thumbs_up_down',
    }, 
    {
          name: 'Employee Portal',
          children: [
            {
              name: 'User Management',
              link: "/dashboard/settings/permission/users",
            },
            {
              name: 'Account Role',
              link: "/dashboard/settings/permission/users",
            },
          ],
          icon: 'mc-business_center',
      },
      {
        name: 'Career Guide',
        children: [
          {
            name: 'User Management',
            link: "/dashboard/settings/permission/users",
          },
          {
            name: 'Account Role',
            link: "/dashboard/settings/permission/users",
          },
        ],
        icon: 'mcf-file_present',
      }, 
      {
        name: 'GDPR',
        children: [
          {
            name: 'User Management',
            link: "/dashboard/settings/permission/users",
          },
          {
            name: 'Account Role',
            link: "/dashboard/settings/permission/users",
          },
        ],
        icon: 'mc-corporate_fare',
      }
  ] 

  panelOpenState = false;

  constructor() {}
  
  ngOnInit(): void {
  }

}
