import { Router } from '@angular/router';
import { getUserEmail } from './../../../utility/store/selectors/user.selector';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { MatDrawer } from '@angular/material/sidenav';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// ngrx
import { State } from '../../../utility/store/reducers';
import { getDefaultAccountId } from '../../../utility/store/selectors/account.selector';

// Mat table
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

// Mat modal
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';

// Services
import { SnackBarService } from '../../../utility/services/snack-bar.service';
import { UserListService } from '../shared/services/user-list.service';
import { UserService } from '../shared/services/user.service';
import { MFilterComponent } from '../m-filter/m-filter.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { fadeAnimation } from '../../../animations';


import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { getRoles } from '../../../utility/store/selectors/roles.selector';
import { ConfirmationComponent } from '../../../utility/components/confirmation/confirmation.component';
import { SETTINGS_LN } from '../../shared/settings.lang';
import { ROUTE_CONFIGS } from '../../../utility/configs/routerConfig';
import { UserRoleService } from '../shared/services/user-role.service';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss'],
  animations: [fadeAnimation]
})
export class UserManageComponent implements OnInit {
  ln = SETTINGS_LN;

  toggle = false;
  status = [
    { value: '', viewValue: this.ln.TXT_ALL },
    { value: '0', viewValue: this.ln.TXT_DEACTIVE },
    { value: '1', viewValue: this.ln.TXT_ACTIVE },
    { value: '2', viewValue: this.ln.TXT_PENDING }
  ];

  sorts = [
    { value: 'lastupdated', viewValue: this.ln.TXT_LAST_UPDATED },
    { value: 'status', viewValue: this.ln.TXT_STATUS },
    { value: 'roletypeid', viewValue: this.ln.TXT_ROLE }
  ]

  role!: any[];

  selectedStatus!: number;
  selectedRole!: number;
  selectedSort = "lastupdated";
  displayedColumns: string[] = ['check', 'name', 'roletypeid', 'email', 'status', 'lastupdated', 'action'];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  addUserModalRef!: MatDialogRef<AddUserComponent>;

  totalUsers: number = 0;

  currentUser!: any;
  currentUserEdit!: boolean;

  viewUserPermission = false;
  hideUserActionMenu = true;

  accountID!: string;

  loggedinUserEmail!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatDrawer, { static: false }) drawer!: MatDrawer;
  @ViewChild('modalRefElement', { static: false }) modalRefElement!: ElementRef;


  constructor(
    private userlistServ: UserListService,
    private userServ: UserService,
    private store: Store<State>,
    public dialog: MatDialog,
    private snackBar: SnackBarService,
    private _bottomSheet: MatBottomSheet,
    private userRoleService: UserRoleService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.store.select(getRoles).subscribe(roles => {
      this.role = [{ roletypeid: '', name: this.ln.TXT_ALL }, ...roles];
    });
    this.store.select(getUserEmail).subscribe(email => {
      this.loggedinUserEmail = email;
    })

  }

  ngAfterViewInit(): void {
    this.store.select(getDefaultAccountId).subscribe((accountid: any) => {
      this.accountID = accountid;
      if (accountid) this.loadUsers();
    });
  }

  preventDefault(e: Event) {
    e.preventDefault();
  }

  openBottomSheet(): void {
    const appliedFilterData = { sort: this.sort.active, filter_status: this.selectedStatus, filter_roletypeid: this.selectedRole }
    this._bottomSheet.open(MFilterComponent, { data: appliedFilterData }).afterDismissed()
      .subscribe(result => {
        if (result) {
          console.log(result);

          this.selectedRole = result.filter_roletypeid[0] === '' ? undefined : result.filter_roletypeid;
          this.selectedStatus = result.filter_status[0] === '' ? undefined : result.filter_status;
          this.sort.active = result.sort;
          this.loadUsers();
        }
      })
  }

  toggleFab() {
    this.toggle = !this.toggle;
  }

  addUserModal() {
    this.addUserModalRef = this.dialog.open(AddUserComponent, {
      autoFocus: false, panelClass: 'modal'
    })
    this.addUserModalRef.afterClosed().subscribe(res => {
      if (res) {
        this.userAdded();
      }
    })
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  loadUsers() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {

          return this.userlistServ.getUserList(
            this.accountID,
            this.paginator.pageSize,
            this.paginator.pageIndex * this.paginator.pageSize,
            {
              sort: this.selectedSort,
              sortOrder: this.sort.direction == "desc" ? "desc" : "asc",
              filter_roletypeid: this.selectedRole,
              filter_status: this.selectedStatus
            });
        }),
        map((res: any) => {
          this.paginator.length = this.totalUsers = res?.data.totalcount;
          // Flip flag to show that loading has finished.
          return res?.data.userslist;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe((data: any) => {
        this.dataSource = new MatTableDataSource(data)
      });
  }


  deactivateUser(email: string) {
    this.toggleUserActionMenu();

    this.userServ.updateUserStatus({ 'email': email, 'status': 0 }).subscribe(res => {
      if (res.error) {
        // error from api
        this.snackBar.open(res.message);
        const updateditem = this.dataSource.data.find(e => e.email == email);
        const index = this.dataSource.data.indexOf(updateditem);
        this.dataSource.data[index] = { ...{ status: 0 } };

        this.dataSource = new MatTableDataSource(this.dataSource.data);
      }
      else {
        // success from api
        this.snackBar.open(res.message);
      }
    })
  }
  activateUser(email: string) {
    this.toggleUserActionMenu();

    this.userServ.updateUserStatus({ 'email': email, 'status': 1 }).subscribe(res => {
      if (res.error) {
        // error from api
        this.snackBar.open(res.message);
        const updateditem = this.dataSource.data.find(e => e.email == email);
        const index = this.dataSource.data.indexOf(updateditem);
        this.dataSource.data[index] = { ...{ status: 1 } };

        this.dataSource = new MatTableDataSource(this.dataSource.data);
      }
      else {
        // success from api
        this.snackBar.open(res.message);
      }
    })
  }

  deleteUser(email: string, i: number) {
    const dialogRef = this.dialog.open(ConfirmationComponent, { width: '500px', });

    dialogRef.afterClosed().subscribe(isConfirmed => {
      if (isConfirmed) {


        this.userServ.deleteUser({ 'email': email }).subscribe(res => {
          if (res.error) this.snackBar.open(res.message);
          else {
            this.snackBar.open(res.message);
            this.dataSource.data.splice(i, 1);
            this.dataSource = new MatTableDataSource(this.dataSource.data);
          }
        });
      }
    });
  }

  toggleUserActionMenu() {
    this.hideUserActionMenu = false;
    setTimeout(() => {
      this.hideUserActionMenu = true;
    }, 100);
  }

  openTblItem(userData: any) {
    this.currentUser = userData;
    this.currentUserEdit = false;
    if (this.hideUserActionMenu) this.drawer.toggle();
    setTimeout(() => {
      this.hideUserActionMenu = true;
    }, 100)
  }

  viewPermission(element: any) {
    const data = { selectedRole: { rolename: element.role, roletypeid: element.roletypeid }, isView: true, isEdit: false, isNew: false };
    this.userRoleService.setCurrentRole(data);
    this.router.navigate([ROUTE_CONFIGS.VIEW_ROLE]);
  }

  viewDetails(element: any) {
    this.currentUser = element;
    this.currentUserEdit = false;
    this.viewUserPermission = false;
    this.drawer.open();
  }

  editUser(element: any, evt?: Event) {
    evt?.stopPropagation();
    this.currentUser = element;
    this.currentUserEdit = true;
    this.viewUserPermission = false;
    this.drawer.open();
    console.log("Called", this.drawer)
  }

  onHeaderSort() {
    this.sort.sort({ id: this.selectedSort, disableClear: false, start: 'asc' })
  }

  changeStatus(emitted: { status: number, email: string }) {
    emitted.status == 0 ? this.deactivateUser(emitted.email) : this.activateUser(emitted.email);
  }

  userUpdated(emitted: { userEmail: string, firstname: string, middlename: string, lastname: string, roletypeid: number, email: string }) {

    const updateditem = this.dataSource.data.find(e => e.email == emitted.userEmail);
    const index = this.dataSource.data.indexOf(updateditem);
    this.dataSource.data[index] = { ...emitted };

    this.dataSource = new MatTableDataSource(this.dataSource.data);
  }

  userAdded() {
    this.paginator.pageIndex = 0;
    this.selectedRole = 0;
    this.selectedStatus = 0;
    this.selectedSort = "lastupdated";
    this.loadUsers();
  }
}
