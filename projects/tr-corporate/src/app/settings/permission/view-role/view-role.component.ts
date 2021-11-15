import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

// store
import { Store } from '@ngrx/store';
import { State } from '../../../utility/store/reducers';

// Component
import { AddRoleComponent } from '../add-role/add-role.component';
import { UserRoleService } from '../services/user-role.service';
import { getDefaultAccountId } from '../../../utility/store/selectors/account.selector';
import { fadeAnimation } from '../../../animations';
import { MatDrawer } from '@angular/material/sidenav';

// table data


const ELEMENT_DATA = [
  { role: 'Admin', users: 25, lastupdated: '17 Apr 2021' },
  { role: 'Super Admin', users: 5, status: 'Inactive', lastupdated: '17 Apr 2021' },
  { role: 'Relationship Manager', users: 3, lastupdated: '17 Apr 2021' },
  { role: 'Delivery Manager', users: 5, lastupdated: '17 Apr 2021' },
  { role: 'Business Manager', users: 5, lastupdated: '17 Apr 2021' },
  { role: 'Business Lead', users: 5, lastupdated: '17 Apr 2021' },
  { role: 'Vendor', users: 5, status: 'Inactive', lastupdated: '17 Apr 2021' },
  { role: 'New Hire', users: 5, lastupdated: '17 Apr 2021' },
  { role: 'HR Manager', users: 5, lastupdated: '17 Apr 2021' },
];

export interface Irole {
  accountroleid: string;
  isdefaultrole: number; // 1 -dafault, 0 - custom
  roletypeid: number;
  rolename: string;
  users: number;
  lastupdated: Date | string;
}

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.scss'],
  animations: [fadeAnimation]
})
export class ViewRoleComponent implements AfterViewInit, OnInit {

  toggle = false;
  status = [
    { value: '0', viewValue: 'Active' },
    { value: '1', viewValue: 'Inactive' },
    { value: '2', viewValue: 'Deactivated' }
  ];
  role = [
    { value: '0', viewValue: 'Admin' },
    { value: '1', viewValue: 'Super Admin' }
  ];
  sortby = [
    { value: '0', viewValue: 'Shot By: Added to Jobs' },
    { value: '1', viewValue: 'Shot By: Added to Jobs' },
    { value: '2', viewValue: 'Shot By: Added to Jobs' }
  ];
  selectedStatus = this.status[0].value;
  selectedRole = this.role[0].value;
  selectedSort = this.sortby[0].value;
  displayedColumns: string[] = ['rolename', 'users', 'lastupdated', 'action'];
  // dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  dataSource = new Observable<Irole[]>();
  isRateLimitReached: boolean = false;
  accountid!: string;

  selectedRoleInfo!: { roletypeid: number, rolename: string } | null;

  // pagination
  offset: number = 0;
  resultsLength: number = 0;
  pageSize = 10; // limit

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatDrawer, { static: false }) drawer!: MatDrawer;


  constructor(
    private dialog: MatDialog,
    private userRoleService: UserRoleService,
    private router: Router,
    private store: Store<State>) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.store.select(getDefaultAccountId).subscribe(accountid => {
      if (accountid) {
        this.accountid = accountid;
        this.loadUserRoles(accountid);
      }
    });
  }

  resetPaging(): void {
    this.paginator.pageIndex = 1;
  }

  roleSubmitHandler() {
    this.resetPaging();
    this.drawer.close();
    this.loadUserRoles(this.accountid);
  }

  createNewRole() {
    this.selectedRoleInfo = null;
    this.drawer.open();
  }

  viewRoleDeatils(role: Irole) {
    this.selectedRoleInfo = { roletypeid: role.roletypeid, rolename: role.rolename };
    this.drawer.open();
  }

  loadUserRoles(accountid: string) {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.offset = 0;
    });


    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          if (this.paginator.pageIndex > 0) this.offset = this.pageSize * this.paginator.pageIndex + 1;

          return this.userRoleService.getUserRoles(
            accountid,
            this.offset,
            this.pageSize,
            this.sort.active,
            this.sort.direction == "desc" ? "DESC" : "ASC");
        }),
        map((res: any) => {
          // Flip flag to show that loading has finished.
          this.isRateLimitReached = false;
          this.resultsLength = res?.data?.totalcount;
          return res?.data?.roles;
        }),
        catchError(() => {
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource = data);
  }

  toggleFab() {
    this.toggle = !this.toggle;
  }

  addUserRole() {
    const isMobile = false;
    if (!isMobile) {
      this.router.navigateByUrl('dashboard/settings/permission/role');
    } else {
      const dialogRef = this.dialog.open(AddRoleComponent);
    }
  }

  deleteRole(role: Irole) {
    console.log(role)
  }

}
