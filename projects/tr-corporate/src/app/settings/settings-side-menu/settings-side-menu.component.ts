import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';

interface FoodNode {
  name: string;
  route?: string;
  children?: FoodNode[];
  icon?: string;
}

const TREE_DATA: FoodNode[] = [
  {
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
  selector: 'app-settings-side-menu',
  templateUrl: './settings-side-menu.component.html',
  styleUrls: ['./settings-side-menu.component.scss']
})
export class SettingsSideMenuComponent implements OnInit {

  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
  
  ngOnInit(): void {
  }

}
