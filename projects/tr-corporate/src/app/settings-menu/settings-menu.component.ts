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
    name: 'Permission Permission Permission',
    children: [
      {name: 'User Management User Management User Management'},
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
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss']
})
export class SettingsMenuComponent implements OnInit {

  activeNodeParent : string;
  activeNodeChild : string;

  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
    this.activeNodeParent= "";
    this.activeNodeChild= "";
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
  
  ngOnInit(): void {
  }

  test(name:string)
  {
    this.activeNodeParent = name
    console.log(this.activeNodeParent)
    console.log("works")
  }

}
