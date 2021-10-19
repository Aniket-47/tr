import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-account-role',
  templateUrl: './account-role.component.html',
  styleUrls: ['./account-role.component.scss']
})
export class AccountRoleComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['role', 'users', 'lastupdated', 'status', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}


// table data

export interface PeriodicElement {
  role: string;
  users: string;
  status: string;
  lastupdated: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
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