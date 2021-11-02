import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// table data


const ELEMENT_DATA = [
  {role: 'Admin', users: '25 Users ', status: 'Active', lastupdated: '17 Apr 2021'},
  {role: 'Super Admin', users: '5 Users ', status: 'Inactive', lastupdated: '17 Apr 2021'},
  {role: 'Relationship Manager', users: '3 Users ', status: 'Active', lastupdated: '17 Apr 2021'},
  {role: 'Delivery Manager', users: '15 Users ', status: 'Active', lastupdated: '17 Apr 2021'},
  {role: 'Business Manager', users: '5 Users ', status: 'Active', lastupdated: '17 Apr 2021'},
  {role: 'Business Lead', users: '4 Users ', status: 'Active', lastupdated: '17 Apr 2021'},
  {role: 'Vendor', users: '16 Users ', status: 'Inactive', lastupdated: '17 Apr 2021'},
  {role: 'New Hire', users: '35 Users ', status: 'Active', lastupdated: '17 Apr 2021'},
  {role: 'HR Manager', users: '10 Users ', status: 'Inactive', lastupdated: '17 Apr 2021'},
];
@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.scss']
})
export class ViewRoleComponent implements OnInit {

  toggle = false;
  status = [
    {value: '0', viewValue: 'Active'},
    {value: '1', viewValue: 'Inactive'},
    {value: '2', viewValue: 'Deactivated'}
  ];
  role = [
    {value: '0', viewValue: 'Admin'},
    {value: '1', viewValue: 'Super Admin'}
  ];
  sortby = [
    {value: '0', viewValue: 'Shot By: Added to Jobs'},
    {value: '1', viewValue: 'Shot By: Added to Jobs'},
    {value: '2', viewValue: 'Shot By: Added to Jobs'}
  ];
  selectedStatus = this.status[0].value;
  selectedRole = this.role[0].value;
  selectedSort = this.sortby[0].value;
  displayedColumns: string[] = ['role', 'users', 'lastupdated', 'status', 'action'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  toggleFab() {
    this.toggle = !this.toggle;
  }

}
