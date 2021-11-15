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
import { UserListService } from '../services/user-list.service';
import { UserService } from '../services/user.service';
import { MFilterComponent } from '../m-filter/m-filter.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { fadeAnimation } from '../../../animations';


import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { getRoles } from '../../../utility/store/selectors/roles.selector';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss'],
  animations: [fadeAnimation]
})
export class UserManageComponent implements OnInit {

  toggle = false;
  status = [
    { value: '0', viewValue: 'Deactive' },
    { value: '1', viewValue: 'Active' },
    { value: '2', viewValue: 'Pending' }
  ];
  role!: any[];

  selectedStatus!: number;
  selectedRole!: number;
  displayedColumns: string[] = ['check', 'name', 'email', 'roletypeid', 'status', 'lastupdated', 'action'];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  addUserModalRef!: MatDialogRef<AddUserComponent>;

  totalUsers!: number;

  currentUser!: any;
  currentUserEdit!: boolean;

  viewUserPermission = false;
  showUserActionMenu = true;

  accountID!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatDrawer, { static: false }) drawer!: MatDrawer;

  @ViewChild('modalRefElement', { static: false }) modalRefElement!: ElementRef;

  constructor(private userlistServ: UserListService, private userServ: UserService, private store: Store<State>, public dialog: MatDialog, private snackBar: SnackBarService, private _bottomSheet: MatBottomSheet) {
    this.totalUsers = 0;
    // this.store.select(getDefaultAccountId)
    //   .subscribe(accountid => {
    //     if (accountid) {
    //       this.userlistServ.getUserList(accountid).subscribe(res => {
    //         // console.log(res);
    //         this.dataSource = new MatTableDataSource(res.data.userslist)
    //         this.dataSource.paginator = this.paginator;

    //         // set this to total users from api
    //         this.totalUsers = res.data.totalcount;
    //       });
    //     }
    //   })
  }

  ngOnInit(): void {
    this.store.select(getRoles).subscribe(roles => {
      this.role = roles;
    });
  }

  preventDefault(e: Event) {
    e.preventDefault();
  }

  openBottomSheet(): void {
    this._bottomSheet.open(MFilterComponent).afterDismissed()
      .subscribe(result => {
        console.log(result);

      })
  }
  ngAfterViewInit(): void {
    this.store.select(getDefaultAccountId).subscribe((accountid: any) => {
      this.accountID = accountid;
      if (accountid) this.loadUsers();
    });
  }

  toggleFab() {
    this.toggle = !this.toggle;
  }

  addUserModal() {
    this.addUserModalRef = this.dialog.open(AddUserComponent, {
      autoFocus: false, panelClass: 'modal'
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
              sort: this.sort.active,
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
      ).subscribe((data: any) => this.dataSource = new MatTableDataSource(data));
  }


  deactivateUser(email: string) {
    // console.log(userID);

    this.userServ.updateUserStatus({ 'email': email, 'status': 0 }).subscribe(res => {
      if (res.error) {
        // error from api
        this.snackBar.open(res.message);
      }
      else {
        // success from api
        this.snackBar.open(res.message);
      }
    })
  }
  activateUser(email: string) {
    // console.log(userID);

    this.userServ.updateUserStatus({ 'email': email, 'status': 1 }).subscribe(res => {
      if (res.error) {
        // error from api
        this.snackBar.open(res.message);
      }
      else {
        // success from api
        this.snackBar.open(res.message);
      }
    })
  }

  deleteUser(email: string) {
    this.userServ.deleteUser({ 'email': email }).subscribe(res => {
      if (res.error) {
        // error from api
        this.snackBar.open(res.message);
      }
      else {
        // success from api
        this.snackBar.open(res.message);
      }
    })
  }

  openTblItem(userData: any) {
    this.currentUser = userData;
    this.currentUserEdit = false;
    this.viewUserPermission = false;
    if (this.showUserActionMenu) this.drawer.toggle();
    setTimeout(() => {
      this.showUserActionMenu = true;
    }, 100)
  }

}
