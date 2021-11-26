import { TranslatePipe } from '@mucrest/ng-core';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
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
import { MFilterComponent } from '../m-filter/m-filter.component';
import { UtilityService } from '../../../utility/services/utility.service';
import { Irole } from '../shared/interfaces/role.model';
import { DesignService } from '../../../utility/services/design.service';


@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.scss'],
  animations: [fadeAnimation]
})
export class ViewRoleComponent implements OnInit, AfterViewInit {

  ln = SETTINGS_LN;
  route_conf = ROUTE_CONFIGS;

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
    { value: 'rolename', viewValue: this.translate.transform(this.ln.TXT_ROLE_NAME) },
    // { value: 'usercount', viewValue: this.ln.TXT_SORT_BY_ADDED_USER_COUNT },
    { value: 'modifiedDatetime', viewValue: this.translate.transform(this.ln.TXT_LAST_UPDATED) }
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
    private translate: TranslatePipe,
    private configServ: RouterConfigService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private store: Store<State>,
    private _bottomSheet: MatBottomSheet,
    public designService: DesignService,
    private util: UtilityService) {
    this.config = configServ.routerconfig;
  }

  ngOnInit(): void {
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
          // this.pageSize = 10;
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
    if (window.innerWidth < 750) {
      if (!this.isRateLimitReached && !this.isLoadingMore && this.util.isMobile()) {
        console.log('Loading more data...')
        this.paginator.pageIndex++;
        this.isLoadingMore = true;
        this.loadUserRoles(this.accountid);
        this.cdRef.detectChanges();
      }
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
    this.router.navigate([ROUTE_CONFIGS.ADD_ROLE]);
  }

  viewRoleDeatils(role: Irole) {
    this.router.navigate([ROUTE_CONFIGS.VIEW_ROLE, role.accountroleid]);
  }

  editRole(role: Irole) {
    if (role.isdefaultrole) {
      this.snackbarServ.open(this.translate.transform(this.ln.TXT_DEFAULT_ROLE_CANNOT_UPDATE, this.ln.TXT_OK));
      return;
    }
    this.router.navigate([ROUTE_CONFIGS.EDIT_ROLE, role.accountroleid]);
  }

  deleteRole(role: Irole) {
    if (role.isdefaultrole) {
      this.snackbarServ.open(this.translate.transform(this.ln.TXT_DEFAULT_ROLE_CANNOT_DELETE, this.ln.TXT_OK));
      return;
    }

    if (role.usercount > 0) {
      this.snackbarServ.open(this.translate.transform(this.ln.TXT_USERS_ASSOCIATED_TO_ROLE, this.ln.TXT_OK));
      return;
    }

    if (!role.isdefaultrole && role) {
      const dialogRef = this.dialog.open(ConfirmationComponent, { width: '500px', });

      dialogRef.afterClosed().subscribe(isConfirmed => {
        if (isConfirmed) {
          this.userRoleService.deleteRole(+role.accountroleid).subscribe((res: any) => {
            if (!res.error) {
              this.snackbarServ.open(this.translate.transform(this.ln.TXT_SUCCESSFULLY_DELETED, this.ln.TXT_OK));
              this.loadUserRoles(this.accountid);
            } else this.snackbarServ.open(res?.message);
          });
        }
      });
    }
  }

  openBottomSheet(): void {
    const appliedFilterData = { sort: this.sort.active, forRoles: true }
    this._bottomSheet.open(MFilterComponent, { data: appliedFilterData }).afterDismissed()
      .subscribe(result => {
        if (result) {
          this.selectedSort = result.sort;
          // console.log(this.selectedSort);
          this.onHeaderSort();
        }
      })
  }

}
