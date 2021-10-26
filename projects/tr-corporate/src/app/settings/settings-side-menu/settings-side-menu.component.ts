import { Component, OnInit } from '@angular/core';

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
      icon: 'icon-mc mc-grading',
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
      icon: 'icon-mcf mcf-book',
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
      icon: 'icon-mcf mcf-add_task',
    },
    // {
    //   name: 'Integration',
    //   children: [
    //     {
    //       name: 'User Management',
    //       link: "/dashboard/settings/permission/users",
    //     },
    //     {
    //       name: 'Account Role',
    //       link: "/dashboard/settings/permission/users",
    //     }
    //   ],
    //   icon: 'icon-mcf mcf-add_task',
    // },
    // {
    //   name: 'Integration',
    //   children: [
    //     {
    //       name: 'User Management',
    //       link: "/dashboard/settings/permission/users",
    //     },
    //     {
    //       name: 'Account Role',
    //       link: "/dashboard/settings/permission/users",
    //     }
    //   ],
    //   icon: 'icon-mcf mcf-add_task',
    // },
    // {
    //   name: 'Integration',
    //   children: [
    //     {
    //       name: 'User Management',
    //       link: "/dashboard/settings/permission/users",
    //     },
    //     {
    //       name: 'Account Role',
    //       link: "/dashboard/settings/permission/users",
    //     }
    //   ],
    //   icon: 'icon-mcf mcf-add_task',
    // },
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
      icon: 'icon-mcf mcf-add_task',
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
      icon: 'icon-mcf mcf-add_task',
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
      icon: 'icon-mcf mcf-add_task',
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
      icon: 'icon-mcf mcf-add_task',
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
      icon: 'icon-mc mc-settings_brightness',
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
      icon: 'icon-mc mc-money',
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
      icon: 'icon-mcf mcf-account_circle',
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
      icon: 'icon-mc mc-thumbs_up_down',
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
      icon: 'icon-mcf mcf-card_travel',
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
      icon: 'icon-mcf mcf-file_present',
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
      icon: 'icon-mc mc-corporate_fare',
    }
  ] 

  panelOpenState = false;

  constructor() {}
  
  ngOnInit(): void {
  }


}
