import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { fadeAnimation } from '../../../animations';

// store
import { Store } from '@ngrx/store';
import { State } from '../../../utility/store/reducers';
import { getDefaultAccountId } from '../../../utility/store/selectors/account.selector';

// services
import { SnackBarService } from '../../../utility/services/snack-bar.service';
import { RouterConfigService } from '../../../utility/services/router-config.service';
import { UserRoleService } from '../shared/services/user-role.service';

// Component
import { AddRoleComponent } from '../add-role/add-role.component';
import { ConfirmationComponent } from '../../../utility/components/confirmation/confirmation.component';


export interface Irole {
  accountroleid: string;
  isdefaultrole: number; // 1 -dafault, 0 - custom
  roletypeid: number;
  rolename: string;
  usercount: number;
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
  config: any;

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
  displayedColumns: string[] = ['rolename', 'usercount', 'lastupdated', 'action'];
  // dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  dataSource = new Observable<Irole[]>();
  isRateLimitReached: boolean = false;
  showUserActionMenu = true;
  accountid!: string;

  selectedRoleInfo!: { roletypeid: number, rolename: string, accountroleid?: string } | null;

  // pagination
  offset: number = 0;
  resultsLength: number = 0;
  pageSize = 10; // limit

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatDrawer, { static: false }) drawer!: MatDrawer;

  isEditRole: boolean = false;
  isViewRole: boolean = false;

  constructor(
    private dialog: MatDialog,
    private userRoleService: UserRoleService,
    private snackbarServ: SnackBarService,
    private router: Router,
    private configServ: RouterConfigService,
    private store: Store<State>) {
    this.config = configServ.routerconfig;
  }

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
          if (this.paginator.pageIndex > 0) this.offset = this.pageSize * this.paginator.pageIndex;
          else this.offset = 0;

          return this.userRoleService.getUserRoles(
            accountid,
            this.offset,
            this.pageSize,
            this.sort.active,
            this.sort.direction == "desc" ? "desc" : "asc");
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


  roleSubmitHandler() {
    this.resetPaging();
    this.drawer.close();
    this.loadUserRoles(this.accountid);
    this.reset();
  }

  createNewRole() {
    this.selectedRoleInfo = null;
    this.drawer.open();
  }

  viewRoleDeatils(role: Irole) {
    if (this.showUserActionMenu) {
      this.selectedRoleInfo = { roletypeid: role.roletypeid, rolename: role.rolename };
      this.isViewRole = true;
      this.isEditRole = false;
      this.drawer.open();
    }
  }

  editRole(role: Irole) {
    this.toggleTblRowClick();
    if (role.isdefaultrole) {
      this.snackbarServ.open("Default role can't be updated.", "Ok");
      return;
    }

    this.isEditRole = true;
    this.isViewRole = false
    this.selectedRoleInfo = { roletypeid: role.roletypeid, rolename: role.rolename, accountroleid: role.accountroleid };
    this.drawer.open();
  }

  deleteRole(role: Irole) {
    this.toggleTblRowClick();
    if (role.isdefaultrole) {
      this.snackbarServ.open("Default role can't be deleted.", "Ok");
      return;
    }

    if (role.usercount > 0) {
      this.snackbarServ.open("Users are associated to this role.", "Ok");
      return;
    }

    if (!role.isdefaultrole && role) {
      const dialogRef = this.dialog.open(ConfirmationComponent, { width: '500px', });

      dialogRef.afterClosed().subscribe(isConfirmed => {
        if (isConfirmed) {
          this.userRoleService.deleteRole(+role.accountroleid).subscribe((res: any) => {
            if (!res.error) {
              this.snackbarServ.open('Successfully deleted', "Ok");
              this.loadUserRoles(this.accountid);
            } else this.snackbarServ.open(res?.message);
          });
        }
      });
    }
  }

  reset() {
    this.selectedRoleInfo = null;
    this.isEditRole = false;
    this.isViewRole = false;
    this.drawer.close();
  }

  toggleTblRowClick() {
    this.showUserActionMenu = false;
    setTimeout(() => {
      this.showUserActionMenu = true;
    }, 100);
  }
}
