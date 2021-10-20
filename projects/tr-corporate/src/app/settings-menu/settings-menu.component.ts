import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';

interface SettingMenuOption {
  name: string;
  route?: string;
  children?: SettingMenuOption[];
  icon?: string;
}

const TREE_DATA: SettingMenuOption[] = [
  {
    name: 'Permission PermissionPermission',
    children: [
      {name: 'User Management UserManagement User Management'},
      {name: 'Account Role'},
    ],
    icon: 'search',
  }, {
    name: 'Templates',
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'table_view',
  },{
    name: 'Integration',
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'done_outline',
  }, {
    name: 'Configuration',
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'reorder',
  },{
    name: 'Candidate Portal',
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'search',
  }, {
    name: 'Billing',
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'table_view',
  },{
    name: 'Vendor Portal',
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'done_outline',
  }, {
    name: 'Employee Portal',
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'reorder',
  },{
    name: 'Career Guide',
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'search',
  }, {
    name: 'Templates',
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'table_view',
  },{
    name: 'Integration',
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'done_outline',
  }, {
    name: 'Configuration',
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'reorder',
  },{
    name: 'Permission',
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'search',
  }, {
    name: 'Templates',
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'table_view',
  },{
    name: 'Integration',
    children: [
      {name: 'User Management'},
      {name: 'Account Role'},
    ],
    icon: 'done_outline',
  }, {
    name: 'Configuration',
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

  activeNodeParent : string;
  activeNodeChild : string;

  treeControl = new NestedTreeControl<SettingMenuOption>(node => node.children);
  dataSource = new MatTreeNestedDataSource<SettingMenuOption>();

  constructor() {
    this.dataSource.data = TREE_DATA;
    this.activeNodeParent= "";
    this.activeNodeChild= "";
  }

  hasChild = (_: number, node: SettingMenuOption) => !!node.children && node.children.length > 0;
  
  ngOnInit(): void {
  }

  test(name:string)
  {
    this.activeNodeParent = name
    console.log(this.activeNodeParent)
    console.log("works")
  }

}
