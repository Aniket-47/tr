import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';

interface SettingMenuOption {
  name: string;
  expanded?: boolean;
  route?: string;
  children?: SettingMenuOption[];
  icon?: string;
}

const TREE_DATA: SettingMenuOption[] = [
  {
    name: 'Permission PermissionPermission',
    expanded: false,
    children: [
      {name: 'User Management UserManagement User Management'},
      {name: 'Account Role'},
    ],
    icon: 'search',
  }, {
    name: 'Templates',
    expanded: false,
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'table_view',
  },{
    name: 'Integration',
    expanded: false,
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'done_outline',
  }, {
    name: 'Configuration',
    expanded: false,
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'reorder',
  },{
    name: 'Candidate Portal',
    expanded: false,
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'search',
  }, {
    name: 'Billing',
    expanded: false,
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'table_view',
  },{
    name: 'Vendor Portal',
    expanded: false,
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'done_outline',
  }, {
    name: 'Employee Portal',
    expanded: false,
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'reorder',
  },{
    name: 'Career Guide',
    expanded: false,
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'search',
  }, {
    name: 'Templates',
    expanded: false,
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'table_view',
  },{
    name: 'Integration',
    expanded: false,
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'done_outline',
  }, {
    name: 'Configuration',
    expanded: false,
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'reorder',
  },{
    name: 'Permission',
    expanded: false,
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'search',
  }, {
    name: 'Templates',
    expanded: false,
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'table_view',
  },{
    name: 'Integration',
    expanded: false,
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'done_outline',
  }, {
    name: 'Configuration',
    expanded: false,
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'reorder',
  },
];

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss']
})
export class SettingsMenuComponent implements OnInit {
  @ViewChild ("tree")tree: any;

  activeNodeParent : string;
  activeNodeChild : string;

  treeControl = new NestedTreeControl<SettingMenuOption>(node => node.
    children);
  dataSource = new MatTreeNestedDataSource<SettingMenuOption>();

  constructor() {
    this.dataSource.data = TREE_DATA;
    this.activeNodeParent= "";
    this.activeNodeChild= "";
  }

  hasChild = (_: number, node: SettingMenuOption) => !!node.children && node.children.length > 0;
  
  ngOnInit(): void {
  }

  changeState(node: any) {
    console.log(node);
    
    TREE_DATA.forEach(node => {
      node.expanded = false;      
    });
    node.expanded = !node.expanded;
  }

}
