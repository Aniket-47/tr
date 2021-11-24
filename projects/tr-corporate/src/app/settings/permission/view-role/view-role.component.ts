import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, merge, Observable, of as observableOf } from 'rxjs';
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
import { SETTINGS_LN } from '../../shared/settings.lang';
import { ROUTE_CONFIGS } from '../../../utility/configs/routerConfig';
import { MatTableDataSource } from '@angular/material/table';


export interface Irole {
  accountroleid: string;
  isdefaultrole: number; // 1 -dafault, 0 - custom
  roletypeid: number;
  name: string;
  rolename: string;
  usercount: number;
  modifiedDatetime: Date | string;
}

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.scss'],
  animations: [fadeAnimation]
})
export class ViewRoleComponent implements OnInit, AfterViewInit {

  ln = SETTINGS_LN;

  toggle = false;
  config: any;

  // status = [
  //   { value: '0', viewValue: 'Active' },
  //   { value: '1', viewValue: 'Inactive' },
  //   { value: '2', viewValue: 'Deactivated' }
  // ];
  // role = [
  //   { value: '0', viewValue: 'Admin' },
  //   { value: '1', viewValue: 'Super Admin' }
  // ];
  sortby = [
    { value: 'rolename', viewValue: this.ln.TXT_ROLE_NAME },
    // { value: 'usercount', viewValue: this.ln.TXT_SORT_BY_ADDED_USER_COUNT },
    { value: 'modifiedDatetime', viewValue: this.ln.TXT_LAST_UPDATED }
  ];
  // selectedStatus = this.status[0].value;
  // selectedRole = this.role[0].value;
  selectedSort = this.sortby[1].value;
  displayedColumns: string[] = ['rolename', 'usercount', 'modifiedDatetime', 'action'];
  // dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  dataSource!: MatTableDataSource<any>;
  isRateLimitReached: boolean = true;
  showUserActionMenu = true;
  accountid!: string;

  // pagination
  offset: number = 0;
  limit: number = 10;
  resultsLength: number = 0;
  pageSize = 10;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  isLoadingMore: boolean = false;

  tblRowClick$!: Observable<any>;
  moreMenuClick$!: Observable<any>;

  constructor(
    private dialog: MatDialog,
    private userRoleService: UserRoleService,
    private snackbarServ: SnackBarService,
    private configServ: RouterConfigService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private store: Store<State>) {
    this.config = configServ.routerconfig;
  }

  ngOnInit(): void {
    // fromEvent(window, 'resize').pipe(
    //   map(e => e.currentTarget?.innerWidth)
    // ).subscribe(console.log)
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
    this.paginator.pageIndex = 0;
    this.offset = 0;
    this.limit = 10;
  }

  onHeaderSort() {
    this.sort.sort({ id: this.selectedSort, disableClear: false, start: 'asc' });
  }

  loadUserRoles(accountid: string) {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.resetPaging());

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          if (this.paginator.pageIndex > 0) this.offset = this.limit * this.paginator.pageIndex;
          else this.offset = 0;
          console.log(this.paginator.pageIndex)

          return this.userRoleService.getUserRoles(
            accountid,
            this.offset,
            this.limit,
            this.sort.active,
            this.sort.direction == "desc" ? "desc" : "asc");
        }),
        map((res: any) => {
          this.resultsLength = res?.data?.totalcount;
          this.pageSize = this.resultsLength || 10;
          return res?.data?.roles
        }),
        catchError(() => {
          this.isRateLimitReached = true;
          this.isLoadingMore = false;
          return observableOf([]);
        })
      ).subscribe((data) => {
        const newData = this.isLoadingMore ? [...this.dataSource.data, ...data] : data;
        this.dataSource = new MatTableDataSource(newData);

        // Flip flag to show that loading has finished.
        this.isRateLimitReached = this.dataSource.data.length === this.resultsLength;
        this.isLoadingMore = false;
        this.cdRef.detectChanges();
      });
  }

  contentScrollYEvt() {
    if (!this.isRateLimitReached && !this.isLoadingMore) {
      console.log('Loading more data...')
      this.paginator.pageIndex++;
      this.isLoadingMore = true;
      this.loadUserRoles(this.accountid);
    }
  }

  toggleFab() {
    this.toggle = !this.toggle;
  }


  createNewRole() {
    this.userRoleService.setCurrentRole({
      isNew: true,
      isView: false,
      isEdit: false,
      selectedRole: null
    });
    this.router.navigate([ROUTE_CONFIGS.VIEW_ROLE]);
  }

  viewRoleDeatils(role: Irole) {
    const selectedRoleInfo = {
      roletypeid: role.roletypeid,
      rolename: role.rolename,
      isCustom: role.isdefaultrole === 0,
      accountroleid: role.accountroleid
    };
    let roleData = { selectedRole: selectedRoleInfo, isEdit: false, isView: true, isNew: false };
    // for custom role pass name as custom 
    if (role.isdefaultrole === 0) selectedRoleInfo.rolename = role.name;
    this.userRoleService.setCurrentRole(roleData);
    this.router.navigateByUrl(ROUTE_CONFIGS.VIEW_ROLE);
  }

  editRole(role: Irole) {
    if (role.isdefaultrole) {
      this.snackbarServ.open(this.ln.TXT_DEFAULT_ROLE_CANNOT_UPDATE, this.ln.TXT_OK);
      return;
    }
    let selectedRoleInfo = {
      roletypeid: role.roletypeid,
      rolename: role.rolename,
      accountroleid: role.accountroleid,
      isCustom: true
    };
    // for custom role pass name as custom 
    if (role.isdefaultrole === 0) selectedRoleInfo.rolename = role.name;

    this.userRoleService.setCurrentRole({ isEdit: true, isView: false, selectedRole: selectedRoleInfo, isNew: false });
    this.router.navigate([ROUTE_CONFIGS.VIEW_ROLE]);
  }

  deleteRole(role: Irole) {
    if (role.isdefaultrole) {
      this.snackbarServ.open(this.ln.TXT_DEFAULT_ROLE_CANNOT_DELETE, this.ln.TXT_OK);
      return;
    }

    if (role.usercount > 0) {
      this.snackbarServ.open(this.ln.TXT_USERS_ASSOCIATED_TO_ROLE, this.ln.TXT_OK);
      return;
    }

    if (!role.isdefaultrole && role) {
      const dialogRef = this.dialog.open(ConfirmationComponent, { width: '500px', });

      dialogRef.afterClosed().subscribe(isConfirmed => {
        if (isConfirmed) {
          this.userRoleService.deleteRole(+role.accountroleid).subscribe((res: any) => {
            if (!res.error) {
              this.snackbarServ.open(this.ln.TXT_SUCCESSFULLY_DELETED, this.ln.TXT_OK);
              this.loadUserRoles(this.accountid);
            } else this.snackbarServ.open(res?.message);
          });
        }
      });
    }
  }
}
