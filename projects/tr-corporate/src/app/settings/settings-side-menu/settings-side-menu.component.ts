import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';

interface FoodNode {
  name: string;
  route?: string;
  children?: FoodNode[];
  icon?: string;
}

// const TREE_DATA: FoodNode[] = [
//   {
//     name: 'Permission',
//     children: [
//       {name: 'User Management'},
//       {name: 'Account Role'},
//     ],
//     icon: 'mc-grading',
//   }, {
//     name: 'Templates',
//     children: [
//       {name: 'User Management'},
//       {name: 'Account Role'},
//     ],
//     icon: 'mc-class',
//   },{
//     name: 'Integration',
//     children: [
//       {name: 'User Management'},
//       {name: 'Account Role'},
//     ],
//     icon: 'mc-add-task',
//   }, {
//     name: 'Configuration',
//     children: [
//       {name: 'User Management'},
//       {name: 'Account Role'},
//     ],
//     icon: 'mc-brightness_7',
//   },{
//     name: 'Billing',
//     children: [
//       {name: 'User Management'},
//       {name: 'Account Role'},
//     ],
//     icon: 'mc-attach_money',
//   }, {
//     name: 'Candidate Portal',
//     children: [
//       {name: 'User Management'},
//       {name: 'Account Role'},
//     ],
//     icon: 'mc-account_circle',
//   },{
//     name: 'Vendor Portal',
//     children: [
//       {name: 'User Management'},
//       {name: 'Account Role'},
//     ],
//     icon: 'mc-thumbs_up_down',
//   }, {
//     name: 'Employee Portal',
//     children: [
//       {name: 'User Management'},
//       {name: 'Account Role'},
//     ],
//     icon: 'mc-business_center',
//   },{
//     name: 'Career Guide',
//     children: [
//       {name: 'User Management'},
//       {name: 'Account Role'},
//     ],
//     icon: 'mc-file_present',
//   }, {
//     name: 'GDPR',
//     children: [
//       {name: 'User Management'},
//       {name: 'Account Role'},
//     ],
//     icon: 'mc-corporate_fare',
//   },{
//     name: 'Integration',
//     children: [
//       {name: 'User Management'},
//       {name: 'Account Role'},
//     ],
//     icon: 'done_outline',
//   }, {
//     name: 'Configuration',
//     children: [
//       {name: 'User Management'},
//       {name: 'Account Role'},
//     ],
//     icon: 'reorder',
//   },{
//     name: 'Permission',
//     children: [
//       {name: 'User Management'},
//       {name: 'Account Role'},
//     ],
//     icon: 'search',
//   }, {
//     name: 'Templates',
//     children: [
//       {name: 'User Management'},
//       {name: 'Account Role'},
//     ],
//     icon: 'table_view',
//   },{
//     name: 'Integration',
//     children: [
//       {name: 'User Management'},
//       {name: 'Account Role'},
//     ],
//     icon: 'done_outline',
//   }, {
//     name: 'Configuration',
//     children: [
//       {name: 'User Management'},
//       {name: 'Account Role'},
//     ],
//     icon: 'reorder',
//   },
// ];

// const heroes = [];
// const listItems = [];

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
  ]

  

  panelOpenState = false;


  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor() {
    // this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
  
  ngOnInit(): void {
  }

}
